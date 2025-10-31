"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const DocGetRawContentOperate = {
    name: 'Get Document Raw Content',
    value: 'doc:getRawContent',
    options: [
        {
            displayName: 'Document ID',
            name: 'document_id',
            type: 'string',
            required: true,
            default: '',
            description: '文档的唯一标识。',
        },
    ],
    async call(index) {
        const document_id = this.getNodeParameter('document_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/docx/v1/documents/${document_id}/raw_content`,
        });
    },
};
exports.default = DocGetRawContentOperate;
//# sourceMappingURL=DocGetRawContentOperate.js.map