"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesNodeCopyOperate = {
    name: 'Copy Wiki Space Node',
    value: 'wiki:spaces:node:copy',
    order: 90,
    options: [
        {
            displayName: '知识空间ID',
            name: 'space_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '节点Token',
            name: 'node_token',
            type: 'string',
            typeOptions: { password: true },
            required: true,
            default: '',
        },
        {
            displayName: '目标父节点Token',
            name: 'target_parent_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: '目标父节点Token，与目标知识空间ID不可同时为空',
        },
        {
            displayName: '目标知识空间ID',
            name: 'target_space_id',
            type: 'string',
            default: '',
            description: '目标知识空间ID，与目标父节点Token不可同时为空',
        },
        {
            displayName: '新标题',
            name: 'title',
            type: 'string',
            default: '',
            description: '复制后的新标题。如果填空，则新标题为空。如果不填，则使用原节点标题',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const nodeToken = this.getNodeParameter('node_token', index);
        const targetParentToken = this.getNodeParameter('target_parent_token', index);
        const targetSpaceId = this.getNodeParameter('target_space_id', index);
        const title = this.getNodeParameter('title', index);
        const body = {};
        if (targetParentToken) {
            body.target_parent_token = targetParentToken;
        }
        if (targetSpaceId) {
            body.target_space_id = targetSpaceId;
        }
        if (title !== undefined) {
            body.title = title;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/copy`,
            body,
        });
    },
};
exports.default = WikiSpacesNodeCopyOperate;
//# sourceMappingURL=WikiSpacesNodeCopyOperate.js.map