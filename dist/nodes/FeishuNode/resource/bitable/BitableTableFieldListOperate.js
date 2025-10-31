"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '列出字段',
    value: 'bitable:table:field:list',
    order: 60,
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格 App 的唯一标识。',
        },
        {
            displayName: '多维表格 ID',
            name: 'table_id',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格数据表的唯一标识。',
        },
        {
            displayName: '视图 ID',
            name: 'view_id',
            type: 'string',
            default: '',
            description: '多维表格中视图的唯一标识。',
        },
        {
            displayName: '是否数组形式返回',
            name: 'text_field_as_array',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '分页标记',
            name: 'page_toke',
            type: 'string',
            default: '',
            description: '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
        },
        {
            displayName: '分页大小',
            name: 'page_size',
            type: 'number',
            default: 20,
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const view_id = this.getNodeParameter('view_id', index);
        const text_field_as_array = this.getNodeParameter('text_field_as_array', index);
        const page_token = this.getNodeParameter('page_toke', index);
        const page_size = this.getNodeParameter('page_size', index);
        const qs = {};
        if (view_id)
            qs.view_id = view_id;
        qs.text_field_as_array = text_field_as_array;
        if (page_token)
            qs.page_token = page_token;
        if (page_size)
            qs.page_size = page_size;
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields`,
            qs
        });
    },
};
//# sourceMappingURL=BitableTableFieldListOperate.js.map