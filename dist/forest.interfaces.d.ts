import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { AgentOptions } from '@forestadmin/agent';
export type ForestModuleOptions = {
    datasources?: any[];
} & AgentOptions;
export interface ForestOptionsFactory {
    createForestModuleOptions(): Promise<ForestModuleOptions> | ForestModuleOptions;
}
export interface ForestModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    extraProviders?: Provider[];
    useClass?: Type<ForestOptionsFactory>;
    useExisting?: Type<ForestOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<ForestModuleOptions> | ForestModuleOptions;
}
