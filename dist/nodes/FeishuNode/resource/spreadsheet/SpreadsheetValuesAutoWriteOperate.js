"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const n8n_workflow_1 = require("n8n-workflow");
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const SpreadsheetValuesWriteOperate = {
    name: '自动写入数据',
    value: 'spreadsheet:valuesAutoWrite',
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
            displayName: '工作表 ID',
            name: 'sheetId',
            type: 'string',
            required: true,
            default: "",
        },
        {
            displayName: '数据',
            name: 'values',
            type: 'json',
            required: true,
            default: '[["第一行1","第一行2"]，["第二行1","第二行2"]]',
        },
        {
            displayName: '开始行数',
            name: 'startLine',
            type: 'number',
            required: true,
            default: 1,
        }
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const startLine = this.getNodeParameter('startLine', index);
        const values = NodeUtils_1.default.getNodeJsonData(this, 'values', index);
        if (!Array.isArray(values) || values.length === 0) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), '数据不能为空');
        }
        function getColumnHeader(index) {
            let column = '';
            index++;
            while (index > 0) {
                const remainder = (index - 1) % 26;
                column = String.fromCharCode(65 + remainder) + column;
                index = Math.floor((index - 1) / 26);
            }
            return column;
        }
        const headers = Object.values(values[0]);
        const maxColumnHeader = getColumnHeader(headers.length);
        const range = `${sheetId}!A${startLine}:${maxColumnHeader}${startLine - 1 + values.length}`;
        const body = {
            valueRange: {
                range,
                values: values,
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
//# sourceMappingURL=SpreadsheetValuesAutoWriteOperate.js.map