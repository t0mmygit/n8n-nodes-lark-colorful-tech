"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetCellsUnmergeOperate = {
    name: '拆分单元格',
    value: 'spreadsheet:unmergeCells',
    order: 80,
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
            displayName: '单元格范围',
            name: 'range',
            type: 'string',
            required: true,
            default: '',
            description: '要拆分的单元格的范围，格式为 &lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const range = this.getNodeParameter('range', index);
        const body = {
            range,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/unmerge_cells`,
            body,
        });
    },
};
exports.default = SpreadsheetCellsUnmergeOperate;
//# sourceMappingURL=SpreadsheetCellsUnmergeOperate.js.map