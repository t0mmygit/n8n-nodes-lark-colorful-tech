"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetDimensionAddOperate = {
    name: '增加行列',
    value: 'spreadsheet:addDimension',
    order: 90,
    options: [
        {
            displayName: '电子表格 Token',
            name: 'spreadsheet_toke',
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
            description: '更新的维度。',
        },
        {
            displayName: '增加的行数或列数',
            name: 'length',
            type: 'number',
            required: true,
            default: 1,
            description: '要增加的行数或列数。取值范围为 (0,5000]。',
        },
    ],
    async call(index) {
        const spreadsheet_token = this.getNodeParameter('spreadsheet_toke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const majorDimension = this.getNodeParameter('majorDimension', index);
        const length = this.getNodeParameter('length', index);
        const body = {
            dimension: {
                sheetId,
                majorDimension,
                length,
            },
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/dimension_range`,
            body,
        });
    },
};
exports.default = SpreadsheetDimensionAddOperate;
//# sourceMappingURL=SpreadsheetDimensionAddOperate.js.map