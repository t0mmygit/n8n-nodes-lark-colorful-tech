"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetSheetsDeleteOperate = {
    name: '删除工作表',
    value: 'spreadsheet:deleteSheets',
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
            displayName: '工作表的 ID',
            name: 'sheetId',
            type: 'string',
            required: true,
            default: '',
        }
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const body = {
            requests: [
                {
                    deleteSheet: {
                        sheetId
                    },
                },
            ],
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/sheets_batch_update`,
            body,
        });
    },
};
exports.default = SpreadsheetSheetsDeleteOperate;
//# sourceMappingURL=SpreadsheetSheetsDeleteOperate.js.map