import { DynamicModule, Module } from '@nestjs/common';

import { ForestModuleAsyncOptions, ForestModuleOptions } from './forest.interfaces';
import { ForestCoreModule } from './forest-core.module';

@Module({})
export class ForestModule {
    public static forRoot(options: ForestModuleOptions): DynamicModule {
        return {
            module: ForestModule,
            imports: [ForestCoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: ForestModuleAsyncOptions): DynamicModule {
        return {
            module: ForestModule,
            imports: [ForestCoreModule.forRootAsync(options)],
        };
    }
}
