"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
exports.default = {
    name: '更新字段',
    value: 'bitable:table:field:update',
    order: 60,
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
            displayName: '字段 ID',
            name: 'field_id',
            type: 'string',
            required: true,
            default: '',
            description: '数据表中一个字段的唯一标识。',
        },
        {
            displayName: '请求体JSON',
            name: 'body',
            type: 'json',
            required: true,
            default: '{"field_name":"测试","type":1}',
            description: '参考：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-field/update#requestBody',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const field_id = this.getNodeParameter('field_id', index);
        const body = NodeUtils_1.default.getNodeJsonData(this, 'body', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields/${field_id}`,
            body: body
        });
    },
};
//# sourceMappingURL=BitableTableFieldUpdateOperate.js.map