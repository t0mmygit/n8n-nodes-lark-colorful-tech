"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
exports.default = {
    name: '更新视图',
    value: 'bitable:table:view:update',
    order: 80,
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格 App 的唯一标识。',
        },
        {
            displayName: '多维表格 ID',
            name: 'table_id',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格数据表的唯一标识。',
        },
        {
            displayName: '视图 ID',
            name: 'view_id',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格中视图的唯一标识。',
        },
        {
            displayName: '视图名称',
            name: 'view_name',
            type: 'string',
            default: '',
            description: '长度不超过 100 个字符, 不为空且不包含这些特殊符号：[ ]',
        },
        {
            displayName: '视图属性',
            name: 'property',
            type: 'json',
            default: '{}',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const view_id = this.getNodeParameter('view_id', index);
        const view_name = this.getNodeParameter('view_name', index);
        const property = NodeUtils_1.default.getNodeJsonData(this, 'property', index);
        const body = {};
        if (view_name) {
            body.view_name = view_name;
        }
        if (property) {
            body.property = property;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'PATCH',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/views/${view_id}`,
            body: body
        });
    },
};
//# sourceMappingURL=BitableTableViewUpdateOperate.js.map