import { ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class FeishuOauth2Api implements ICredentialType {
    name: string;
    extends: string[];
    displayName: string;
    icon: string;
    properties: INodeProperties[];
}
