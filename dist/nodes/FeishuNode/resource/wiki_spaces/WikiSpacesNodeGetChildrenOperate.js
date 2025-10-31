"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesNodeGetChildrenOperate = {
    name: 'Get Wiki Space Node Childen',
    value: 'wiki:spaces:node:children',
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
            displayName: '父节点Token',
            name: 'parent_node_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
        },
        {
            displayName: '每页大小',
            name: 'page_size',
            type: 'number',
            default: 20,
            description: '分页大小，最大值50',
        },
        {
            displayName: '分页标记',
            name: 'page_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: '分页标记，第一次请求不填',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const parentNodeToken = this.getNodeParameter('parent_node_token', index);
        const pageSize = this.getNodeParameter('page_size', index);
        const pageToken = this.getNodeParameter('page_token', index);
        const qs = {
            page_size: pageSize,
        };
        if (parentNodeToken) {
            qs.parent_node_token = parentNodeToken;
        }
        if (pageToken) {
            qs.page_token = pageToken;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
            qs,
        });
    },
};
exports.default = WikiSpacesNodeGetChildrenOperate;
//# sourceMappingURL=WikiSpacesNodeGetChildrenOperate.js.map