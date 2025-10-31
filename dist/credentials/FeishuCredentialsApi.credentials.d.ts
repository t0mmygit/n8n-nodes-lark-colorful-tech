import { IAuthenticateGeneric, ICredentialDataDecryptedObject, ICredentialTestRequest, ICredentialType, IHttpRequestHelper, INodeProperties } from 'n8n-workflow';
export declare class FeishuCredentialsApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: string;
    properties: INodeProperties[];
    preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject): Promise<{
        accessToken: any;
    }>;
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
