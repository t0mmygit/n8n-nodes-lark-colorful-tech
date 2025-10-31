"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetDimensionMoveOperate = {
    name: '移动行列',
    value: 'spreadsheet:moveDimension',
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
            name: 'sheet_id',
            type: 'string',
            required: true,
            default: '',
            description: '工作表的 ID。',
        },
        {
            displayName: '移动的维度',
            name: 'major_dimension',
            type: 'options',
            options: [
                { name: '行', value: 'ROWS' },
                { name: '列', value: 'COLUMNS' },
            ],
            required: true,
            default: 'ROWS',
            description: '移动的维度。',
        },
        {
            displayName: '起始位置',
            name: 'start_index',
            type: 'number',
            default: 0,
            description: '要移动的行或列的起始位置。从 0 开始计数。',
        },
        {
            displayName: '结束位置',
            name: 'end_index',
            type: 'number',
            default: 0,
            description: '要移动的行或列结束的位置。从 0 开始计数。',
        },
        {
            displayName: '目标位置',
            name: 'destination_index',
            type: 'number',
            default: null,
            required: true,
            description: '移动的目标位置行或者列。',
        },
    ],
    async call(index) {
        const spreadsheet_token = this.getNodeParameter('spreadsheet_toke', index);
        const sheet_id = this.getNodeParameter('sheet_id', index);
        const major_dimension = this.getNodeParameter('major_dimension', index);
        const start_index = this.getNodeParameter('start_index', index);
        const end_index = this.getNodeParameter('end_index', index);
        const destination_index = this.getNodeParameter('destination_index', index);
        const body = {
            source: {
                major_dimension,
                start_index,
                end_index,
            },
            destination_index,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}/sheets/${sheet_id}/move_dimension`,
            body,
        });
    },
};
exports.default = SpreadsheetDimensionMoveOperate;
//# sourceMappingURL=SpreadsheetDimensionMoveOperate.js.map