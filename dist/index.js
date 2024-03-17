"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElasticsearchDataSourceWithExistingClient = exports.createElasticsearchDataSource = void 0;
__exportStar(require("./forest.module"), exports);
__exportStar(require("./forest.service"), exports);
__exportStar(require("@forestadmin/agent"), exports);
__exportStar(require("@forestadmin/datasource-customizer"), exports);
__exportStar(require("@forestadmin/datasource-dummy"), exports);
__exportStar(require("@forestadmin/datasource-live"), exports);
__exportStar(require("@forestadmin/datasource-mongoose"), exports);
__exportStar(require("@forestadmin/datasource-replica"), exports);
__exportStar(require("@forestadmin/datasource-sequelize"), exports);
__exportStar(require("@forestadmin/datasource-sql"), exports);
__exportStar(require("@forestadmin/datasource-toolkit"), exports);
var datasource_elasticsearch_1 = require("@forestadmin-experimental/datasource-elasticsearch");
Object.defineProperty(exports, "createElasticsearchDataSource", { enumerable: true, get: function () { return datasource_elasticsearch_1.createElasticsearchDataSource; } });
Object.defineProperty(exports, "createElasticsearchDataSourceWithExistingClient", { enumerable: true, get: function () { return datasource_elasticsearch_1.createElasticsearchDataSourceWithExistingClient; } });
__exportStar(require("@forestadmin-experimental/datasource-hubspot"), exports);
//# sourceMappingURL=index.js.map