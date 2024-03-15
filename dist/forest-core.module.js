"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ForestCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForestCoreModule = void 0;
const common_1 = require("@nestjs/common");
const forest_constants_1 = require("./forest.constants");
const forest_providers_1 = require("./forest.providers");
const forest_service_1 = require("./forest.service");
let ForestCoreModule = ForestCoreModule_1 = class ForestCoreModule {
    static forRoot(options) {
        const provider = (0, forest_providers_1.createForestProviders)(options);
        return {
            exports: [provider, forest_service_1.ForestService],
            module: ForestCoreModule_1,
            providers: [provider, forest_service_1.ForestService],
        };
    }
    static forRootAsync(options) {
        const provider = {
            inject: [forest_constants_1.FOREST_MODULE_OPTIONS],
            provide: forest_constants_1.FOREST_TOKEN,
            useFactory: (options) => new forest_service_1.ForestService(options),
        };
        return {
            exports: [provider, forest_service_1.ForestService],
            imports: options.imports,
            module: ForestCoreModule_1,
            providers: [...this.createAsyncProviders(options), provider, forest_service_1.ForestService],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProviders(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProviders(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProviders(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: forest_constants_1.FOREST_MODULE_OPTIONS,
                useFactory: options.useFactory,
            };
        }
        const inject = [(options.useClass || options.useExisting)];
        return {
            provide: forest_constants_1.FOREST_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createForestModuleOptions(); }),
            inject,
        };
    }
};
exports.ForestCoreModule = ForestCoreModule;
exports.ForestCoreModule = ForestCoreModule = ForestCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], ForestCoreModule);
//# sourceMappingURL=forest-core.module.js.map