"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesDeleteMemberOperate = {
    name: 'Delete Wiki Space Members',
    value: 'wiki:spaces:members:delete',
    order: 97,
    options: [
        {
            displayName: '知识空间ID',
            name: 'space_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '成员ID',
            name: 'member_id',
            type: 'string',
            required: true,
            default: '',
            description: '成员或管理员的ID，值的类型由成员类型参数决定',
        },
        {
            displayName: '成员类型',
            name: 'member_type',
            type: 'options',
            required: true,
            options: [
                { name: '群ID', value: 'openchat' },
                { name: '用户ID', value: 'userid' },
                { name: '邮箱', value: 'email' },
                { name: '部门ID', value: 'opendepartmentid' },
                { name: 'Open ID', value: 'openid' },
                { name: 'Union ID', value: 'unionid' },
            ],
            default: 'openid',
            description: '要删除的成员或管理员身份类型',
        },
        {
            displayName: '角色',
            name: 'member_role',
            type: 'options',
            required: true,
            options: [
                { name: '管理员', value: 'admin' },
                { name: '成员', value: 'member' },
            ],
            default: 'member',
            description: '成员的角色类型',
        },
        {
            displayName: '协作者类型',
            name: 'type',
            type: 'options',
            options: [
                { name: '用户', value: 'user' },
                { name: '群组', value: 'chat' },
                { name: '组织架构', value: 'department' },
            ],
            default: 'user',
            description: '知识库协作者类型（暂不支持）',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const memberId = this.getNodeParameter('member_id', index);
        const memberType = this.getNodeParameter('member_type', index);
        const memberRole = this.getNodeParameter('member_role', index);
        const type = this.getNodeParameter('type', index);
        const body = {
            member_type: memberType,
            member_role: memberRole,
        };
        if (type) {
            body.type = type;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/members/${memberId}`,
            body,
        });
    },
};
exports.default = WikiSpacesDeleteMemberOperate;
//# sourceMappingURL=WikiSpacesMemberDeleteOperate.js.map