"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '删除记录',
    value: 'bitable:table:record:delete',
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
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const record_id = this.getNodeParameter('record_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/${record_id}`,
        });
    },
};
//# sourceMappingURL=BitableTableRecrodDeleteOperate.js.map