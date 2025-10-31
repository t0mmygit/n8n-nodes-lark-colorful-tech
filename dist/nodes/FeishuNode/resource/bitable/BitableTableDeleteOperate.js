"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const BitableTableAddOperate = {
    name: '删除数据表',
    value: 'bitable:table:delete',
    order: 90,
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
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}`,
        });
    },
};
exports.default = BitableTableAddOperate;
//# sourceMappingURL=BitableTableDeleteOperate.js.map