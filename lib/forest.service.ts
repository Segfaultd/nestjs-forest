import { INestApplication, Inject, Injectable, Logger } from "@nestjs/common";

import { Agent, createAgent } from '@forestadmin/agent';

import { FOREST_MODULE_OPTIONS } from './forest.constants';
import { ForestModuleOptions } from './forest.interfaces';

@Injectable()
export class ForestService {
    static serviceInstance: ForestService;

    private _app: INestApplication | null = null;
    private readonly _logger = new Logger(ForestService.name);
    private readonly _agent: Agent | null = null;

    constructor(@Inject(FOREST_MODULE_OPTIONS) readonly opts?: ForestModuleOptions) {
        if (!opts) {
            return;
        }

        if(!opts.authSecret || !opts.envSecret){
            this._logger.warn('Forest Admin Agent is not configured properly. Please provide the authSecret and envSecret');
            return;
        }

        // Destructure the options to extract the datasources to bind later one
        const { datasources, ...agentOpts } = opts;

        // Initialize our agent
        this._agent = createAgent(agentOpts);

        // Bind the datasources
        if(datasources && datasources.length > 0){
            for (const datasource of datasources) {
                this._agent = this._agent.addDataSource(datasource);
            }
        }
    }

    static ForestServiceInstance(): ForestService {
        if (!ForestService.serviceInstance) {
            ForestService.serviceInstance = new ForestService();
        }
        return ForestService.serviceInstance;
    }

    get agent(): Agent | null {
        return this._agent;
    }

    setApp(app: INestApplication): void {
        this._app = app;
        if(this.agent){
            this.agent.mountOnNestJs(this._app);
        }
    }

    async start(): Promise<void> {
        if (!this.agent) {
            throw new Error('Forest Agent instance is null or undefined');
        }

        if(!this._app){
            throw new Error('NestJs application instance is null or undefined');
        }

        await this.agent.start();
    }

    async stop(): Promise<void> {
        if (!this.agent) {
            throw new Error('Forest Agent instance is null or undefined');
        }
        await this.agent.stop();
    }
}
