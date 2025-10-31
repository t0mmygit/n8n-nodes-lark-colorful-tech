"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '获取当前应用AccessToken',
    description: '需开通出口ip权限',
    value: 'auth:getAccessToken',
    options: [],
    async call(index) {
        await RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/event/v1/outbound_ip`,
        });
        const credentials = await this.getCredentials('feishuCredentialsApi');
        return {
            accessToken: credentials.accessToken,
        };
    },
};
//# sourceMappingURL=AuthGetAccessToken.js.map