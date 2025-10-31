"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesGetMembersOperate = {
    name: 'Get Wiki Space Members',
    value: 'wiki:spaces:members:get',
    order: 95,
    options: [
        {
            displayName: '知识空间ID',
            name: 'space_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '每页大小',
            name: 'page_size',
            type: 'number',
            default: 20,
            description: '分页大小',
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
        const pageSize = this.getNodeParameter('page_size', index);
        const pageToken = this.getNodeParameter('page_token', index);
        const qs = {
            page_size: pageSize,
        };
        if (pageToken) {
            qs.page_token = pageToken;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/members`,
            qs,
        });
    },
};
exports.default = WikiSpacesGetMembersOperate;
//# sourceMappingURL=WikiSpacesMembersGetOperate.js.map