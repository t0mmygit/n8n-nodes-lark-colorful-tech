"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetSheetsAddOperate = {
    name: '复制工作表',
    value: 'spreadsheet:copySheets',
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
            displayName: '源工作表的 ID',
            name: 'sheetId',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '新工作表名称',
            name: 'title',
            type: 'string',
            default: '',
            required: true,
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const title = this.getNodeParameter('title', index);
        const body = {
            requests: [
                {
                    copySheet: {
                        "source": {
                            "sheetId": sheetId
                        },
                        "destination": {
                            "title": title
                        }
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
exports.default = SpreadsheetSheetsAddOperate;
//# sourceMappingURL=SpreadsheetSheetsCopyOperate.js.map