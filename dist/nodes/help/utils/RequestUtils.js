"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestUtils {
    static async originRequest(options, clearAccessToken = false) {
        let authentication = this.getNodeParameter('authentication', 0);
        console.log('RequestUtils originRequest authentication = ', authentication);
        let additionalCredentialOptions = {};
        if (authentication === 'feishuCredentialsApi') {
            const credentials = await this.getCredentials(authentication);
            console.log('credentials.accessToken', credentials.accessToken);
            options.baseURL = `https://${credentials.baseUrl}`;
            additionalCredentialOptions = {
                credentialsDecrypted: {
                    data: {
                        ...credentials,
                        accessToken: clearAccessToken ? '' : credentials.accessToken,
                    },
                },
            };
        }
        else if (authentication === 'feishuOauth2Api') {
            options.baseURL = `https://open.feishu.cn`;
            let oauth2 = {
                keepBearer: true
            };
            return this.helpers.requestOAuth2
                .call(this, authentication, options, oauth2);
        }
        return this.helpers.requestWithAuthentication
            .call(this, authentication, options, additionalCredentialOptions);
    }
    static async request(options) {
        if (options.json === undefined)
            options.json = true;
        return RequestUtils.originRequest.call(this, options).then((data) => {
            const handleResponse = (data) => {
                if (data.code && data.code !== 0) {
                    throw new Error(`Request Error: ${data.code}, ${data.msg} \n ` + JSON.stringify(data.error));
                }
                return data;
            };
            if (data.code && data.code === 99991663) {
                return RequestUtils.originRequest.call(this, options, true).then((data) => {
                    return handleResponse(data);
                });
            }
            return handleResponse(data);
        });
    }
}
exports.default = RequestUtils;
//# sourceMappingURL=RequestUtils.js.map