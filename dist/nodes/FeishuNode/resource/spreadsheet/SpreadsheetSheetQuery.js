"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetSheetQuery = {
    name: '查询工作表',
    value: 'spreadsheet:querySheet',
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
        {
            displayName: '工作表 ID',
            name: 'sheetId',
            type: 'string',
            required: true,
            default: '',
            description: '工作表的 ID。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const response = await RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/${sheetId}`,
        });
        return response;
    },
};
exports.default = SpreadsheetSheetQuery;
//# sourceMappingURL=SpreadsheetSheetQuery.js.map