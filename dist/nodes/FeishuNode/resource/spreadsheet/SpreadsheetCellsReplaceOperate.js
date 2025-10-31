"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetCellsReplaceOperate = {
    name: '替换单元格',
    value: 'spreadsheet:replaceCells',
    order: 80,
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
        },
        {
            displayName: '查找范围',
            name: 'range',
            type: 'string',
            required: true,
            default: '',
            description: '查找范围，格式为 &lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;。',
        },
        {
            displayName: '查找字符串',
            name: 'find',
            type: 'string',
            required: true,
            default: '',
            description: '查找的字符串。',
        },
        {
            displayName: '替换字符串',
            name: 'replacement',
            type: 'string',
            required: true,
            default: '',
            description: '替换的字符串。',
        },
        {
            displayName: '是否忽略查找字符串的大小写',
            name: 'matchCase',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '字符串是否需要完全匹配整个单元格',
            name: 'matchEntireCell',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '是否使用正则表达式查找',
            name: 'searchByRegex',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '是否仅搜索单元格公式',
            name: 'includeFormulas',
            type: 'boolean',
            default: false,
        },
    ],
    async call(index) {
        const spreadsheetToken = this.getNodeParameter('spreadsheetToke', index);
        const sheetId = this.getNodeParameter('sheetId', index);
        const range = this.getNodeParameter('range', index);
        const find = this.getNodeParameter('find', index);
        const replacement = this.getNodeParameter('replacement', index);
        const matchCase = this.getNodeParameter('matchCase', index);
        const matchEntireCell = this.getNodeParameter('matchEntireCell', index);
        const searchByRegex = this.getNodeParameter('searchByRegex', index);
        const includeFormulas = this.getNodeParameter('includeFormulas', index);
        const body = {
            find_condition: {
                range,
                match_case: matchCase,
                match_entire_cell: matchEntireCell,
                search_by_regex: searchByRegex,
                include_formulas: includeFormulas,
            },
            find,
            replacement,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/${sheetId}/replace`,
            body,
        });
    },
};
exports.default = SpreadsheetCellsReplaceOperate;
//# sourceMappingURL=SpreadsheetCellsReplaceOperate.js.map