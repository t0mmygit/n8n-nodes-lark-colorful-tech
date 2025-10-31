"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
exports.default = {
    name: '更新记录',
    value: 'bitable:table:record:update',
    order: 70,
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
            displayName: '记录 ID',
            name: 'record_id',
            type: 'string',
            required: true,
            default: '',
            description: '数据表中一条记录的唯一标识。通过查询记录接口获取。',
        },
        {
            displayName: '用户 ID 类型',
            name: 'user_id_type',
            type: 'options',
            options: [
                { name: 'Open ID', value: 'open_id' },
                { name: 'Union ID', value: 'union_id' },
                { name: 'User ID', value: 'user_id' },
            ],
            description: '用户 ID 类型。',
            default: 'open_id',
        },
        {
            displayName: '是否忽略一致性读写检查',
            name: 'ignore_consistency_check',
            type: 'boolean',
            default: true,
        },
        {
            displayName: '请求体JSON',
            name: 'body',
            type: 'json',
            required: true,
            default: '{"fields":{}}',
            description: '参考：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/update#requestBody',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const record_id = this.getNodeParameter('record_id', index);
        const user_id_type = this.getNodeParameter('user_id_type', index);
        const ignore_consistency_check = this.getNodeParameter('ignore_consistency_check', index, true);
        const body = NodeUtils_1.default.getNodeJsonData(this, 'body', index);
        const qs = {};
        if (user_id_type)
            qs.user_id_type = user_id_type;
        qs.ignore_consistency_check = ignore_consistency_check;
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/${record_id}`,
            qs,
            body: body
        });
    },
};
//# sourceMappingURL=BitableTableRecrodUpdateOperate.js.map