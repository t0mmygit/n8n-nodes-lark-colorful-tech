"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
exports.default = {
    name: '新增字段',
    value: 'bitable:table:field:add',
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
            displayName: '操作的唯一标识',
            name: 'client_toke',
            type: 'string',
            default: '',
            description: '操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作',
        },
        {
            displayName: '请求体JSON',
            name: 'body',
            type: 'json',
            required: true,
            default: '{"field_name":"测试","type":1}',
            description: '参考：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-field/create#requestBody',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const client_token = this.getNodeParameter('client_toke', index);
        const body = NodeUtils_1.default.getNodeJsonData(this, 'body', index);
        const qs = {};
        if (client_token)
            qs.client_token = client_token;
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields`,
            qs,
            body: body
        });
    },
};
//# sourceMappingURL=BitableTableFieldAddOperate.js.map