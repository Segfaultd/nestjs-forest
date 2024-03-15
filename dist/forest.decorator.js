"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectForestModuleConfig = exports.InjectForest = void 0;
const common_1 = require("@nestjs/common");
const forest_constants_1 = require("./forest.constants");
const makeInjectableDecorator = (token) => () => (0, common_1.Inject)(token);
exports.InjectForest = makeInjectableDecorator(forest_constants_1.FOREST_TOKEN);
exports.InjectForestModuleConfig = makeInjectableDecorator(forest_constants_1.FOREST_MODULE_OPTIONS);
//# sourceMappingURL=forest.decorator.js.map