"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const MessageBatchSendOperate = {
    name: 'Batch Send Message',
    value: 'message:batchSend',
    options: [
        {
            displayName: '消息类型',
            name: 'msg_type',
            type: 'options',
            options: [
                { name: 'Text', value: 'text' },
                { name: 'Image', value: 'image' },
                { name: 'Post', value: 'post' },
                { name: 'Share Chat', value: 'share_chat' },
                { name: 'Interactive', value: 'interactive' },
            ],
            description: '消息类型。',
            required: true,
            default: 'text',
        },
        {
            displayName: '消息内容',
            name: 'content',
            type: 'json',
            default: '{"text":"要发送的文本消息"}',
            description: '消息内容，JSON 结构。',
            displayOptions: {
                show: {
                    msg_type: ['text', 'image', 'post', 'share_chat'],
                },
            },
        },
        {
            displayName: '卡片内容',
            name: 'card',
            type: 'json',
            default: '{"elements":[{"tag":"div","text":{"content":"This is the plain text","tag":"plain_text"}}],"header":{"template":"blue","title":{"content":"This is the title","tag":"plain_text"}}}',
            description: '卡片内容，JSON 结构。参考：https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/send-feishu-card',
            displayOptions: {
                show: {
                    msg_type: ['interactive'],
                },
            },
        },
        {
            displayName: '部门 ID 列表',
            name: 'department_ids',
            type: 'json',
            default: '[]',
            description: '部门 ID 列表。',
        },
        {
            displayName: '用户 Open_id 列表',
            name: 'open_ids',
            type: 'json',
            default: '[]',
            description: '用户 open_id 列表。',
        },
        {
            displayName: '用户 User_id 列表',
            name: 'user_ids',
            type: 'json',
            default: '[]',
            description: '用户 user_id 列表。',
        },
        {
            displayName: '用户 Union_id 列表',
            name: 'union_ids',
            type: 'json',
            default: '[]',
            description: '用户 union_id 列表。',
        },
    ],
    async call(index) {
        const msg_type = this.getNodeParameter('msg_type', index);
        const content = NodeUtils_1.default.getNodeJsonData(this, 'content', index, null);
        const card = NodeUtils_1.default.getNodeJsonData(this, 'card', index, null);
        const department_ids = NodeUtils_1.default.getNodeJsonData(this, 'department_ids', index);
        const open_ids = NodeUtils_1.default.getNodeJsonData(this, 'open_ids', index);
        const user_ids = NodeUtils_1.default.getNodeJsonData(this, 'user_ids', index);
        const union_ids = NodeUtils_1.default.getNodeJsonData(this, 'union_ids', index);
        const body = {
            msg_type,
        };
        if (msg_type === 'interactive') {
            body.card = card;
        }
        else {
            body.content = content;
        }
        if (department_ids && department_ids.length > 0) {
            body.department_ids = department_ids;
        }
        if (open_ids && open_ids.length > 0) {
            body.open_ids = open_ids;
        }
        if (user_ids && user_ids.length > 0) {
            body.user_ids = user_ids;
        }
        if (union_ids && union_ids.length > 0) {
            body.union_ids = union_ids;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: '/open-apis/message/v4/batch_send/',
            body,
        });
    },
};
exports.default = MessageBatchSendOperate;
//# sourceMappingURL=MessageBatchSendOperate.js.map