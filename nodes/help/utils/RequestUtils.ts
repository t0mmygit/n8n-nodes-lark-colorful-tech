import { IExecuteFunctions } from 'n8n-workflow';
import {
	IAdditionalCredentialOptions,
	IHttpRequestOptions,
	IOAuth2Options,
} from 'n8n-workflow/dist/esm/interfaces';

class RequestUtils {
	static async originRequest(
		this: IExecuteFunctions,
		options: IHttpRequestOptions,
		clearAccessToken = false,
	) {
		let authentication = this.getNodeParameter('authentication', 0) as string;

		console.log('RequestUtils originRequest authentication = ', authentication);

		let additionalCredentialOptions = {} as IAdditionalCredentialOptions

		if (authentication === 'feishuCredentialsApi') {
			const credentials = await this.getCredentials(authentication);

			options.baseURL = `https://${credentials.baseUrl}`;

			additionalCredentialOptions = {
				// @ts-ignore
				credentialsDecrypted: {
					data: {
						...credentials,
						accessToken: clearAccessToken ? '' : credentials.accessToken,
					},
				},
			};
		}else if (authentication === 'feishuOauth2Api') {

			options.baseURL = `https://open.feishu.cn`;

			additionalCredentialOptions.oauth2 = {
				keepBearer: true
			} as IOAuth2Options
		}

		return this.helpers.httpRequestWithAuthentication
			.call(this, authentication, options, additionalCredentialOptions)
	}

	static async request(this: IExecuteFunctions, options: IHttpRequestOptions) {
		if (options.json === undefined) options.json = true;

		return RequestUtils.originRequest.call(this, options).then((data) => {
			const handleResponse = (data: any) => {
				if (data.code && data.code !== 0) {
					throw new Error(
						`Request Error: ${data.code}, ${data.msg} \n ` + JSON.stringify(data.error),
					);
				}
				return data;
			};

			// 处理一次accesstoken过期的情况
			if (data.code && data.code === 99991663) {
				return RequestUtils.originRequest.call(this, options, true).then((data) => {
					return handleResponse(data);
				});
			}

			return handleResponse(data);
		});
	}
}

export default RequestUtils;
