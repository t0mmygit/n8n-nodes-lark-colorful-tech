"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetDimensionUpdateOperate = {
    name: '更新行列',
    value: 'spreadsheet:updateDimension',
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
            displayName: '起始位置',
            name: 'startIndex',
            type: 'number',
            required: true,
            default: 1,
            description: '要更新的行或列的起始位置。从 1 开始计数。',
        },
        {
            displayName: '结束位置',
            name: 'endIndex',
            type: 'number',
            required: true,
            default: 1,
            description: '要更新的行或列结束的位置。从 1 开始计数。',
        },
        {
            displayName: '是否显示行或列',
            name: 'visible',
            type: 'boolean',
            default: true,
        },
        {
            displayName: '行高或列宽',
            name: 'fixedSize',
            type: 'number',
            default: null,
            description: '行高或列宽。单位为像素。',
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const majorDimension = this.getNodeParameter('majorDimension', index);
        const startIndex = this.getNodeParameter('startIndex', index);
        const endIndex = this.getNodeParameter('endIndex', index);
        const visible = this.getNodeParameter('visible', index);
        const fixedSize = this.getNodeParameter('fixedSize', index);
        const body = {
            dimension: {
                sheetId,
                majorDimension,
                startIndex,
                endIndex,
            },
        };
        const dimensionProperties = {};
        if (visible !== null) {
            dimensionProperties.visible = visible;
        }
        if (fixedSize !== null) {
            dimensionProperties.fixedSize = fixedSize;
        }
        body.dimensionProperties = dimensionProperties;
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/dimension_range`,
            body,
        });
    },
};
exports.default = SpreadsheetDimensionUpdateOperate;
//# sourceMappingURL=SpreadsheetDimensionUpdateOperate.js.map