import { DynamicModule } from '@nestjs/common';
import { ForestModuleAsyncOptions, ForestModuleOptions } from './forest.interfaces';
export declare class ForestModule {
    static forRoot(options: ForestModuleOptions): DynamicModule;
    static forRootAsync(options: ForestModuleAsyncOptions): DynamicModule;
}
