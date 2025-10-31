"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const BitableInfoGetMetadataOperate = {
    name: '获取多维表格元数据',
    value: 'bitable:getMetadata',
    order: 100,
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格 App 的唯一标识。',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/bitable/v1/apps/${app_token}`,
        });
    },
};
exports.default = BitableInfoGetMetadataOperate;
//# sourceMappingURL=BitableInfoGetMetadataOperate.js.map