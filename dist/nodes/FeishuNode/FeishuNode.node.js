"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeishuNode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const ResourceFactory_1 = __importDefault(require("../help/builder/ResourceFactory"));
const resourceBuilder = ResourceFactory_1.default.build(__dirname);
class FeishuNode {
    constructor() {
        this.description = {
            displayName: 'Feishu Node',
            name: 'feishuNode',
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            icon: 'file:icon.png',
            group: ['transform'],
            version: 1,
            description: 'Lark Custom Node',
            defaults: {
                name: 'Lark Custom Node',
            },
            usableAsTool: true,
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'feishuCredentialsApi',
                    displayName: "应用级别凭证",
                    required: true,
                    displayOptions: {
                        show: {
                            authentication: ['feishuCredentialsApi'],
                        },
                    },
                },
                {
                    name: 'feishuOauth2Api',
                    displayName: "用户级别凭证",
                    required: true,
                    displayOptions: {
                        show: {
                            authentication: ['feishuOauth2Api'],
                        },
                    },
                },
            ],
            properties: [
                {
                    displayName: '凭证类型',
                    name: 'authentication',
                    type: 'options',
                    options: [
                        {
                            name: '用户级别凭证',
                            value: 'feishuOauth2Api',
                        },
                        {
                            name: '应用级别凭证',
                            value: 'feishuCredentialsApi',
                        },
                    ],
                    default: 'feishuCredentialsApi',
                },
                ...resourceBuilder.build()
            ],
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        let responseData = {};
        let returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        const callFunc = resourceBuilder.getCall(resource, operation);
        if (!callFunc) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), '未实现方法: ' + resource + '.' + operation);
        }
        if (operation.includes("aggregate")) {
            responseData = await callFunc.call(this, 0);
            const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: 0 } });
            returnData.push(...executionData);
            return [returnData];
        }
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                this.logger.debug('call function', {
                    resource,
                    operation,
                    itemIndex,
                });
                responseData = await callFunc.call(this, itemIndex);
            }
            catch (error) {
                this.logger.error('call function error', {
                    resource,
                    operation,
                    itemIndex,
                    errorMessage: error.message,
                    stack: error.stack,
                });
                if (this.continueOnFail()) {
                    let errorJson = {
                        error: error.message
                    };
                    if (error.name === 'NodeApiError') {
                        errorJson.error = (_a = error === null || error === void 0 ? void 0 : error.cause) === null || _a === void 0 ? void 0 : _a.error;
                    }
                    returnData.push({
                        json: errorJson,
                        pairedItem: itemIndex,
                    });
                    continue;
                }
                else if (error.name === 'NodeApiError') {
                    throw error;
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                        message: error.message,
                        itemIndex,
                    });
                }
            }
            const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: itemIndex } });
            returnData.push(...executionData);
        }
        return [returnData];
    }
}
exports.FeishuNode = FeishuNode;
//# sourceMappingURL=FeishuNode.node.js.map