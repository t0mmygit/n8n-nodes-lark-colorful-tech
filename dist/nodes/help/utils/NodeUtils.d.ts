import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
declare class NodeUtils {
    static getNodeFixedCollection(data: IDataObject, collectionName: string): IDataObject[];
    static getNodeFixedCollectionList(data: IDataObject, collectionName: string, propertyName: string): any[];
    static buildUploadFileData(this: IExecuteFunctions, inputDataFieldName: string, index?: number): Promise<{
        value: Buffer<ArrayBufferLike>;
        options: {
            filename: string | undefined;
            filelength: string | undefined;
            contentType: string;
        };
    }>;
    static getNodeJsonData(data: IExecuteFunctions, propertyName: string, index: number, failValue?: any): any;
}
export default NodeUtils;
