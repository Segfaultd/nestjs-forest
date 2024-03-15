"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var ForestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForestService = void 0;
const common_1 = require("@nestjs/common");
const agent_1 = require("@forestadmin/agent");
const forest_constants_1 = require("./forest.constants");
let ForestService = ForestService_1 = class ForestService {
    constructor(opts) {
        this.opts = opts;
        this._app = null;
        this._agent = null;
        if (!opts) {
            return;
        }
        const { datasources } = opts, agentOpts = __rest(opts, ["datasources"]);
        this._agent = (0, agent_1.createAgent)(agentOpts);
        if (datasources && datasources.length > 0) {
            for (const datasource of datasources) {
                this._agent = this._agent.addDataSource(datasource);
            }
        }
    }
    static ForestServiceInstance() {
        if (!ForestService_1.serviceInstance) {
            ForestService_1.serviceInstance = new ForestService_1();
        }
        return ForestService_1.serviceInstance;
    }
    get agent() {
        return this._agent;
    }
    setApp(app) {
        this._app = app;
        if (this.agent) {
            this.agent.mountOnNestJs(this._app);
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.agent) {
                throw new Error('Forest Agent instance is null or undefined');
            }
            if (!this._app) {
                throw new Error('NestJs application instance is null or undefined');
            }
            yield this.agent.start();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.agent) {
                throw new Error('Forest Agent instance is null or undefined');
            }
            yield this.agent.stop();
        });
    }
};
exports.ForestService = ForestService;
exports.ForestService = ForestService = ForestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(forest_constants_1.FOREST_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], ForestService);
//# sourceMappingURL=forest.service.js.map