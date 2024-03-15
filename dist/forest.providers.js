"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForestProviders = void 0;
const forest_constants_1 = require("./forest.constants");
const forest_service_1 = require("./forest.service");
function createForestProviders(options) {
    return {
        provide: forest_constants_1.FOREST_TOKEN,
        useValue: new forest_service_1.ForestService(options),
    };
}
exports.createForestProviders = createForestProviders;
//# sourceMappingURL=forest.providers.js.map