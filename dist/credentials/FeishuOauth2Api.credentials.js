"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeishuOauth2Api = void 0;
class FeishuOauth2Api {
    constructor() {
        this.name = 'feishuOauth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'Feishu OAuth2 API';
        this.icon = 'file:icon.png';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                required: true,
                default: 'https://accounts.feishu.cn/open-apis/authen/v1/authorize',
                type: 'string',
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                required: true,
                default: 'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
                type: 'string',
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'string',
                required: true,
                default: 'bitable:app wiki:wiki offline_access event:ip_list',
                description: '参考权限：https://open.feishu.cn/document/server-docs/application-scope/scope-list',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'header',
            },
        ];
    }
}
exports.FeishuOauth2Api = FeishuOauth2Api;
//# sourceMappingURL=FeishuOauth2Api.credentials.js.map