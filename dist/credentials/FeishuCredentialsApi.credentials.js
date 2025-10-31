"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeishuCredentialsApi = void 0;
class FeishuCredentialsApi {
    constructor() {
        this.name = 'feishuCredentialsApi';
        this.displayName = 'Feishu Credentials API';
        this.icon = 'file:icon.png';
        this.properties = [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'open.larksuite.com',
                required: true,
            },
            {
                displayName: 'App ID',
                description: '开放平台应用的唯一标识。可以在开发者后台的 凭证与基础信息 页面查看 app_id',
                name: 'appid',
                type: 'string',
                default: '',
            },
            {
                displayName: 'App Secret',
                name: 'appsecret',
                description: '应用的秘钥',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
            },
            {
                displayName: 'Access Token',
                name: 'accessToken',
                type: 'hidden',
                default: '',
                typeOptions: {
                    expirable: true,
                },
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '=https://{{$credentials.baseUrl}}',
                url: `/open-apis/auth/v3/app_access_token/internal`,
                method: 'POST',
                body: {
                    app_id: '={{$credentials.appid}}',
                    app_secret: '={{$credentials.appsecret}}',
                },
            },
            rules: [
                {
                    type: 'responseCode',
                    properties: {
                        value: 200,
                        message: '授权验证失败',
                    },
                },
            ],
        };
    }
    async preAuthentication(credentials) {
        const res = (await this.helpers.httpRequest({
            method: 'POST',
            url: `https://${credentials.baseUrl}/open-apis/auth/v3/app_access_token/internal`,
            body: {
                app_id: credentials.appid,
                app_secret: credentials.appsecret,
            },
        }));
        if (res.code && res.code !== 0) {
            throw new Error('授权失败：' + res.code + ', ' + res.msg);
        }
        return { accessToken: res.tenant_access_token };
    }
}
exports.FeishuCredentialsApi = FeishuCredentialsApi;
//# sourceMappingURL=FeishuCredentialsApi.credentials.js.map