"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetSheetsAddOperate = {
    name: '新增工作表',
    value: 'spreadsheet:addSheets',
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
            displayName: '新增工作表的标题',
            name: 'title',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '新增工作表的位置',
            name: 'index',
            type: 'number',
            default: 0,
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const title = this.getNodeParameter('title', index);
        const _index = this.getNodeParameter('index', index);
        const body = {
            requests: [
                {
                    addSheet: {
                        properties: {
                            title: title,
                            index: _index,
                        },
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
//# sourceMappingURL=SpreadsheetSheetsAddOperate.js.map