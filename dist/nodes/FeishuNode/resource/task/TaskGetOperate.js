"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '获取任务详情',
    value: 'task:get',
    order: 100,
    options: [
        {
            displayName: '任务ID',
            name: 'task_guid',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '用户 ID 类型',
            name: 'user_id_type',
            type: 'options',
            options: [
                { name: 'Open ID', value: 'open_id' },
                { name: 'Union ID', value: 'union_id' },
                { name: 'User ID', value: 'user_id' },
            ],
            description: '用户 ID 类型。',
            default: 'open_id',
        },
    ],
    async call(index) {
        const task_guid = this.getNodeParameter('task_guid', index);
        const user_id_type = this.getNodeParameter('user_id_type', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/task/v2/tasks/${task_guid}`,
            qs: {
                user_id_type: user_id_type,
            },
        });
    },
};
//# sourceMappingURL=TaskGetOperate.js.map