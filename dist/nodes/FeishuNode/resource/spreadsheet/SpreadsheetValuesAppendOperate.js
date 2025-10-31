"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const SpreadsheetValuesAppendOperate = {
    name: '追加数据',
    value: 'spreadsheet:valuesAppend',
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
            description: '追加数据的范围。格式为 &lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;。',
        },
        {
            displayName: '数据',
            name: 'values',
            type: 'json',
            required: true,
            default: '[["第一行1","第一行2"]，["第二行1","第二行2"]]',
            description: '参考：https://open.feishu.cn/document/ukTMukTMukTM/ugjN1UjL4YTN14CO2UTN',
        },
        {
            displayName: '插入数据选项',
            name: 'insertDataOption',
            type: 'options',
            options: [
                {
                    name: '覆盖',
                    value: 'OVERWRITE',
                },
                {
                    name: '插入行',
                    value: 'INSERT_ROWS',
                },
            ],
            default: 'OVERWRITE',
            description: '指定追加数据的方式。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const range = this.getNodeParameter('range', index);
        const values = NodeUtils_1.default.getNodeJsonData(this, 'values', index);
        const insertDataOption = this.getNodeParameter('insertDataOption', index);
        const body = {
            valueRange: {
                range,
                values,
            },
        };
        const response = await RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/values_append`,
            qs: {
                insertDataOption,
            },
            body,
        });
        return response;
    },
};
exports.default = SpreadsheetValuesAppendOperate;
//# sourceMappingURL=SpreadsheetValuesAppendOperate.js.map