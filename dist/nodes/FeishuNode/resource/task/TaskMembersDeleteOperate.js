"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '移除任务成员',
    value: 'task:remove_members',
    order: 90,
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
        {
            displayName: '成员',
            name: 'members',
            type: 'json',
            required: true,
            default: '[{"id":"","role":"assignee","type":"user"}]',
            description: '参考：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members#requestBody',
        },
    ],
    async call(index) {
        const task_guid = this.getNodeParameter('task_guid', index);
        const user_id_type = this.getNodeParameter('user_id_type', index);
        const members = NodeUtils_1.default.getNodeJsonData(this, "members", index);
        const body = { members };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/task/v2/tasks/${task_guid}/remove_members`,
            qs: {
                user_id_type: user_id_type,
            },
            body
        });
    },
};
//# sourceMappingURL=TaskMembersDeleteOperate.js.map