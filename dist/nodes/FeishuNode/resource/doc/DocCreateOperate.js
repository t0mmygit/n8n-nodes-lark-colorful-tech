"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const DocCreateOperate = {
    name: 'Create Document',
    value: 'doc:create',
    options: [
        {
            displayName: '文档标题',
            name: 'title',
            type: 'string',
            default: '',
            description: '文档标题，只支持纯文本, 长度范围：1 字符 ～ 800 字符'
        },
        {
            displayName: '文件夹 Token',
            name: 'folder_toke',
            type: 'string',
            default: '',
            description: '指定文档所在文件夹的 Token。不传或传空表示根目录。',
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
            url: '/open-apis/docx/v1/documents',
            body,
        });
    },
};
exports.default = DocCreateOperate;
//# sourceMappingURL=DocCreateOperate.js.map