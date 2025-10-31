"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const BitableInfoCopyOperate = {
    name: '复制多维表格',
    value: 'bitable:copy',
    order: 100,
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '要复制的多维表格 App 的唯一标识。',
        },
        {
            displayName: '文件夹 Token',
            name: 'folder_toke',
            type: 'string',
            default: '',
            description: '多维表格 App 归属文件夹。默认为空，表示多维表格将被创建在云空间根目录。',
        },
        {
            displayName: '多维表格名称',
            name: 'name',
            type: 'string',
            default: '',
            description: '多维表格 App 名称。最长为 255 个字符。',
        },
        {
            displayName: '是否复制内容',
            name: 'without_content',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '时区',
            name: 'time_zone',
            type: 'string',
            default: '',
            description: '文档时区。参考：https://feishu.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const folder_token = this.getNodeParameter('folder_toke', index, '');
        const name = this.getNodeParameter('name', index, '');
        const without_content = this.getNodeParameter('without_content', index, false);
        const time_zone = this.getNodeParameter('time_zone', index, '');
        const body = {};
        if (folder_token)
            body.folder_token = folder_token;
        if (name)
            body.name = name;
        body.without_content = without_content;
        if (time_zone)
            body.time_zone = time_zone;
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/bitable/v1/apps/${app_token}/copy`,
            body,
        });
    },
};
exports.default = BitableInfoCopyOperate;
//# sourceMappingURL=BitableInfoCopyOperate.js.map