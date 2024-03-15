import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';

import { FOREST_MODULE_OPTIONS, FOREST_TOKEN } from './forest.constants';
import { ForestModuleAsyncOptions, ForestModuleOptions, ForestOptionsFactory } from './forest.interfaces';
import { createForestProviders } from './forest.providers';
import { ForestService } from './forest.service';

@Global()
@Module({})
export class ForestCoreModule {
    public static forRoot(options: ForestModuleOptions): DynamicModule {
        const provider = createForestProviders(options);

        return {
            exports: [provider, ForestService],
            module: ForestCoreModule,
            providers: [provider, ForestService],
        };
    }

    public static forRootAsync(options: ForestModuleAsyncOptions): DynamicModule {
        const provider: Provider = {
            inject: [FOREST_MODULE_OPTIONS],
            provide: FOREST_TOKEN,
            useFactory: (options: ForestModuleOptions) => new ForestService(options),
        };

        return {
            exports: [provider, ForestService],
            imports: options.imports,
            module: ForestCoreModule,
            providers: [...this.createAsyncProviders(options), provider, ForestService],
        };
    }

    private static createAsyncProviders(options: ForestModuleAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProviders(options)];
        }
        const useClass = options.useClass as Type<ForestOptionsFactory>;
        return [
            this.createAsyncOptionsProviders(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }

    private static createAsyncOptionsProviders(options: ForestModuleAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: FOREST_MODULE_OPTIONS,
                useFactory: options.useFactory,
            };
        }
        const inject = [(options.useClass || options.useExisting) as Type<ForestOptionsFactory>];
        return {
            provide: FOREST_MODULE_OPTIONS,
            useFactory: async (optionsFactory: ForestOptionsFactory) => await optionsFactory.createForestModuleOptions(),
            inject,
        };
    }
}
