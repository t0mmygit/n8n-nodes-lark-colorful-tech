"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetDimensionDeleteOperate = {
    name: '删除行列',
    value: 'spreadsheet:deleteDimension',
    order: 90,
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
        {
            displayName: '删除的维度',
            name: 'majorDimension',
            type: 'options',
            options: [
                { name: '行', value: 'ROWS' },
                { name: '列', value: 'COLUMNS' },
            ],
            required: true,
            default: 'ROWS',
            description: '删除的维度。',
        },
        {
            displayName: '起始位置',
            name: 'startIndex',
            type: 'number',
            required: true,
            default: 1,
            description: '要删除的行或列的起始位置。从 1 开始计数。',
        },
        {
            displayName: '结束位置',
            name: 'endIndex',
            type: 'number',
            required: true,
            default: 1,
            description: '要删除的行或列结束的位置。从 1 开始计数。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const majorDimension = this.getNodeParameter('majorDimension', index);
        const startIndex = this.getNodeParameter('startIndex', index);
        const endIndex = this.getNodeParameter('endIndex', index);
        const body = {
            dimension: {
                sheetId,
                majorDimension,
                startIndex,
                endIndex,
            },
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/dimension_range`,
            body,
        });
    },
};
exports.default = SpreadsheetDimensionDeleteOperate;
//# sourceMappingURL=SpreadsheetDimensionDeleteOperate.js.map