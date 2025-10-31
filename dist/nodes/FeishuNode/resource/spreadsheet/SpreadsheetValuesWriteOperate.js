"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const SpreadsheetValuesWriteOperate = {
    name: '写入数据',
    value: 'spreadsheet:valuesWrite',
    order: 70,
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
            displayName: '范围',
            name: 'range',
            type: 'string',
            required: true,
            default: '',
            description: '写入数据的范围。格式为 &lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;。',
        },
        {
            displayName: '数据',
            name: 'values',
            type: 'json',
            required: true,
            default: '[["第一行1","第一行2"]，["第二行1","第二行2"]]',
            description: '参考：https://open.feishu.cn/document/server-docs/docs/sheets-v3/data-types-supported-by-sheets',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const range = this.getNodeParameter('range', index);
        const values = NodeUtils_1.default.getNodeJsonData(this, 'values', index);
        const body = {
            valueRange: {
                range,
                values,
            },
        };
        const response = await RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/values`,
            body,
        });
        return response;
    },
};
exports.default = SpreadsheetValuesWriteOperate;
//# sourceMappingURL=SpreadsheetValuesWriteOperate.js.map