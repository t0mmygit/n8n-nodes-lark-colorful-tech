"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetDimensionInsertOperate = {
    name: '插入行列',
    value: 'spreadsheet:insertDimension',
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
            description: '电子表格工作表的 ID。',
        },
        {
            displayName: '更新的维度',
            name: 'majorDimension',
            type: 'options',
            options: [
                { name: '行', value: 'ROWS' },
                { name: '列', value: 'COLUMNS' },
            ],
            required: true,
            default: 'ROWS',
            description: '要更新的维度。',
        },
        {
            displayName: '起始位置',
            name: 'startIndex',
            type: 'number',
            required: true,
            default: 0,
            description: '插入的行或列的起始位置。从 0 开始计数。',
        },
        {
            displayName: '结束位置',
            name: 'endIndex',
            type: 'number',
            required: true,
            default: 1,
            description: '插入的行或列结束的位置。从 0 开始计数。',
        },
        {
            displayName: '继承样式',
            name: 'inheritStyle',
            type: 'options',
            options: [
                { name: '不继承', value: '' },
                { name: '继承起始位置的样式', value: 'BEFORE' },
                { name: '继承结束位置的样式', value: 'AFTER' },
            ],
            default: '',
            description: '插入的空白行或列是否继承表中的单元格样式。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const majorDimension = this.getNodeParameter('majorDimension', index);
        const startIndex = this.getNodeParameter('startIndex', index);
        const endIndex = this.getNodeParameter('endIndex', index);
        const inheritStyle = this.getNodeParameter('inheritStyle', index);
        const body = {
            dimension: {
                sheetId,
                majorDimension,
                startIndex,
                endIndex,
            },
        };
        if (inheritStyle) {
            body.inheritStyle = inheritStyle;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/insert_dimension_range`,
            body,
        });
    },
};
exports.default = SpreadsheetDimensionInsertOperate;
//# sourceMappingURL=SpreadsheetDimensionInsertOperate.js.map