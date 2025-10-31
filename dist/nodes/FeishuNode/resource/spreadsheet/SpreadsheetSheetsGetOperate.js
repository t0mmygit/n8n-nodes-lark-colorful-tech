"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetSheetsGetOperate = {
    name: '获取工作表',
    value: 'spreadsheet:getSheets',
    order: 95,
    options: [
        {
            displayName: '电子表格 Token',
            name: 'spreadsheetToke',
            type: 'string',
            required: true,
            default: '',
            description: '电子表格的 token。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/query`,
        });
    },
};
exports.default = SpreadsheetSheetsGetOperate;
//# sourceMappingURL=SpreadsheetSheetsGetOperate.js.map