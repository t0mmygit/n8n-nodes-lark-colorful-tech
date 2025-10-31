"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetValuesPrependOperate = {
    name: '插入数据',
    value: 'spreadsheet:valuesPrepend',
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
            description: '指定范围，用于写入数据。格式为 &lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;。',
        },
        {
            displayName: '数据',
            name: 'values',
            type: 'json',
            required: true,
            default: '[["第一行1","第一行2"]，["第二行1","第二行2"]]',
            description: '参考：https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const range = this.getNodeParameter('range', index);
        const values = this.getNodeParameter('values', index);
        const body = {
            valueRange: {
                range,
                values,
            },
        };
        const response = await RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/values_prepend`,
            body,
        });
        return response;
    },
};
exports.default = SpreadsheetValuesPrependOperate;
//# sourceMappingURL=SpreadsheetValuesPrependOperate.js.map