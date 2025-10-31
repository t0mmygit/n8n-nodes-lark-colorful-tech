"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const DocBlockGetContentOperate = {
    name: 'Get Document Block Content',
    value: 'doc:block:getContent',
    options: [
        {
            displayName: 'Document ID',
            name: 'document_id',
            type: 'string',
            required: true,
            default: '',
            description: '文档的唯一标识。',
        },
        {
            displayName: 'Block ID',
            name: 'block_id',
            type: 'string',
            default: '',
            required: true,
        },
        {
            displayName: 'Document Revision ID',
            name: 'document_revision_id',
            type: 'number',
            default: -1,
            description: '查询的文档版本，-1 表示文档最新版本。',
        },
        {
            displayName: 'User ID Type',
            name: 'user_id_type',
            type: 'options',
            default: 'open_id',
            options: [
                {
                    name: 'Open_id',
                    value: 'open_id',
                },
                {
                    name: 'Union_id',
                    value: 'union_id',
                },
                {
                    name: 'User_id',
                    value: 'user_id',
                },
            ],
        },
    ],
    async call(index) {
        const document_id = this.getNodeParameter('document_id', index);
        const block_id = this.getNodeParameter('block_id', index);
        const document_revision_id = this.getNodeParameter('document_revision_id', index, -1);
        const user_id_type = this.getNodeParameter('user_id_type', index, 'open_id');
        const qs = {
            document_revision_id,
            user_id_type,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/docx/v1/documents/${document_id}/blocks/${block_id}`,
            qs,
        });
    },
};
exports.default = DocBlockGetContentOperate;
//# sourceMappingURL=DocBlockGetContentOperate.js.map