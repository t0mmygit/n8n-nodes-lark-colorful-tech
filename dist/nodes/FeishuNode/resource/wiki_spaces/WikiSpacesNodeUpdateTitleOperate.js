"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesNodeUpdateTitleOperate = {
    name: 'Update Wiki Space Node Title',
    value: 'wiki:spaces:node:updateTitle',
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
            displayName: '新标题',
            name: 'title',
            type: 'string',
            required: true,
            default: '',
            description: '节点新标题',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const nodeToken = this.getNodeParameter('node_token', index);
        const title = this.getNodeParameter('title', index);
        const body = {
            title,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/update_title`,
            body,
        });
    },
};
exports.default = WikiSpacesNodeUpdateTitleOperate;
//# sourceMappingURL=WikiSpacesNodeUpdateTitleOperate.js.map