"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesUpdateSettingOperate = {
    name: 'Update Wiki Space Settings',
    value: 'wiki:spaces:settings:update',
    order: 98,
    options: [
        {
            displayName: 'Space ID',
            name: 'space_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: 'Create Setting',
            name: 'create_setting',
            type: 'options',
            options: [
                { name: '管理员和成员', value: 'admin_and_member' },
                { name: '仅管理员', value: 'admin' },
            ],
            default: 'admin_and_member',
            description: '谁可以创建空间的一级页面',
        },
        {
            displayName: '文档操作权限',
            name: 'security_setting',
            type: 'options',
            options: [
                { name: '允许', value: 'allow' },
                { name: '不允许', value: 'not_allow' },
            ],
            default: 'allow',
            description: '可阅读用户是否可创建副本/打印/导出/复制',
        },
        {
            displayName: '评论权限',
            name: 'comment_setting',
            type: 'options',
            options: [
                { name: '允许', value: 'allow' },
                { name: '不允许', value: 'not_allow' },
            ],
            default: 'allow',
            description: '可阅读用户是否可评论',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const createSetting = this.getNodeParameter('create_setting', index);
        const securitySetting = this.getNodeParameter('security_setting', index);
        const commentSetting = this.getNodeParameter('comment_setting', index);
        const body = {};
        if (createSetting) {
            body.create_setting = createSetting;
        }
        if (securitySetting) {
            body.security_setting = securitySetting;
        }
        if (commentSetting) {
            body.comment_setting = commentSetting;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/setting`,
            body,
        });
    },
};
exports.default = WikiSpacesUpdateSettingOperate;
//# sourceMappingURL=WikiSpacesSettingOperate.js.map