"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetTableGetOperate = {
    name: '获取电子表格信息',
    value: 'spreadsheet:getInfo',
    order: 100,
    options: [
        {
            displayName: '电子表格 Token',
            name: 'spreadsheet_toke',
            type: 'string',
            required: true,
            default: '',
            description: '电子表格的 token。',
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
    ],
    async call(index) {
        const spreadsheet_token = this.getNodeParameter('spreadsheet_toke', index);
        const user_id_type = this.getNodeParameter('user_id_type', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}`,
            qs: {
                user_id_type,
            },
        });
    },
};
exports.default = SpreadsheetTableGetOperate;
//# sourceMappingURL=SpreadsheetTableGetOperate.js.map