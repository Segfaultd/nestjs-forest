import { INestApplication } from "@nestjs/common";
import { Agent } from '@forestadmin/agent';
import { ForestModuleOptions } from './forest.interfaces';
export declare class ForestService {
    readonly opts?: ForestModuleOptions | undefined;
    static serviceInstance: ForestService;
    private _app;
    private readonly _agent;
    constructor(opts?: ForestModuleOptions | undefined);
    static ForestServiceInstance(): ForestService;
    get agent(): Agent | null;
    setApp(app: INestApplication): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}
