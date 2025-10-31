"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetTableUpdateOperate = {
    name: '修改电子表格属性',
    value: 'spreadsheet:update',
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
            displayName: '新的电子表格标题',
            name: 'title',
            type: 'string',
            default: '',
            description: '新的电子表格标题。',
        },
    ],
    async call(index) {
        const spreadsheet_token = this.getNodeParameter('spreadsheet_toke', index);
        const title = this.getNodeParameter('title', index);
        const body = {};
        if (title) {
            body.title = title;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'PATCH',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}`,
            body,
        });
    },
};
exports.default = SpreadsheetTableUpdateOperate;
//# sourceMappingURL=SpreadsheetTableUpdateOperate.js.map