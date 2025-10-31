"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const BitableInfoUpdateMetadataOperate = {
    name: '更新多维表格元数据',
    value: 'bitable:updateMetadata',
    order: 100,
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '目标多维表格的 App token。',
        },
        {
            displayName: '多维表格名称',
            name: 'name',
            type: 'string',
            default: '',
            description: '多维表格 App 名称。',
        },
        {
            displayName: '是否开启高级权限',
            name: 'enable_advanced_permissions',
            type: 'boolean',
            default: false,
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const name = this.getNodeParameter('name', index, '');
        const enable_advanced_permissions = this.getNodeParameter('enable_advanced_permissions', index, false);
        const body = {};
        if (name)
            body.name = name;
        body.enable_advanced_permissions = enable_advanced_permissions;
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/bitable/v1/apps/${app_token}`,
            body,
        });
    },
};
exports.default = BitableInfoUpdateMetadataOperate;
//# sourceMappingURL=BitableInfoUpdateMetadataOperate.js.map