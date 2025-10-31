"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const SpreadsheetTableCreateOperate = {
    name: '创建电子表格',
    value: 'spreadsheet:create',
    order: 100,
    options: [
        {
            displayName: '表格标题',
            name: 'title',
            type: 'string',
            default: '',
            description: '表格标题。',
        },
        {
            displayName: '文件夹 Token',
            name: 'folder_toke',
            type: 'string',
            default: ''
        },
    ],
    async call(index) {
        const title = this.getNodeParameter('title', index);
        const folder_token = this.getNodeParameter('folder_toke', index);
        const body = {};
        if (title) {
            body.title = title;
        }
        if (folder_token) {
            body.folder_token = folder_token;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: '/open-apis/sheets/v3/spreadsheets',
            body,
        });
    },
};
exports.default = SpreadsheetTableCreateOperate;
//# sourceMappingURL=SpreadsheetTableCreateOperate.js.map