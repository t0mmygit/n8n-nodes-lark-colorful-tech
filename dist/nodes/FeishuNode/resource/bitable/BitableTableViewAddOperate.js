"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '新增视图',
    value: 'bitable:table:view:add',
    order: 80,
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
            displayName: '视图名称',
            name: 'view_name',
            type: 'string',
            required: true,
            default: '',
            description: '长度不超过 100 个字符, 不为空且不包含这些特殊符号：[ ]',
        },
        {
            displayName: '视图类型',
            name: 'view_type',
            type: 'options',
            options: [
                {
                    name: '表格视图',
                    value: 'grid',
                },
                {
                    name: '看板视图',
                    value: 'kanban',
                },
                {
                    name: '画册视图',
                    value: 'gallery',
                },
                {
                    name: '甘特视图',
                    value: 'gantt',
                },
                {
                    name: '表单视图',
                    value: 'form',
                },
            ],
            default: 'grid',
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const view_name = this.getNodeParameter('view_name', index);
        const view_type = this.getNodeParameter('view_type', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/views`,
            body: {
                view_name,
                view_type,
            }
        });
    },
};
//# sourceMappingURL=BitableTableViewAddOperate.js.map