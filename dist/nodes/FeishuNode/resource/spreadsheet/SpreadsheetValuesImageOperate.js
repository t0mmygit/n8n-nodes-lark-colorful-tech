"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetValuesImageOperate = {
    name: '写入图片',
    value: 'spreadsheet:valuesImage',
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
            description: '指定写入图片的单元格。格式为 &lt;sheetId&gt;!&lt;开始单元格&gt;:&lt;结束单元格&gt;。',
        },
        {
            displayName: '图片二进制字段',
            name: 'imageParameterName',
            type: 'string',
            required: true,
            default: '',
            description: '需要写入的图片的二进制流。',
        },
        {
            displayName: '图片名称',
            name: 'name',
            type: 'string',
            required: true,
            default: '',
            description: '写入的图片名称，需加后缀名。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const range = this.getNodeParameter('range', index);
        const imageParameterName = this.getNodeParameter('imageParameterName', index);
        const name = this.getNodeParameter('name', index);
        const binaryData = await this.helpers.getBinaryDataBuffer(index, imageParameterName);
        const body = {
            range,
            image: Array.from(binaryData),
            name,
        };
        const response = await RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/values_image`,
            body,
        });
        return response;
    },
};
exports.default = SpreadsheetValuesImageOperate;
//# sourceMappingURL=SpreadsheetValuesImageOperate.js.map