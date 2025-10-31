"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const MessageEditOperate = {
    name: 'Edit Message',
    value: 'message:edit',
    options: [
        {
            displayName: '待编辑的消息的ID',
            name: 'message_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '消息类型',
            name: 'msg_type',
            type: 'options',
            options: [
                { name: '文本', value: 'text' },
                { name: '富文本', value: 'post' },
            ],
            description: '消息类型。',
            required: true,
            default: 'text',
        },
        {
            displayName: '消息内容',
            name: 'content',
            type: 'json',
            default: '{"text":"edit content"}',
            description: '消息内容，JSON 结构序列化后的字符串。',
            required: true,
        },
    ],
    async call(index) {
        const message_id = this.getNodeParameter('message_id', index);
        const msg_type = this.getNodeParameter('msg_type', index);
        const content = this.getNodeParameter('content', index);
        const body = {
            msg_type,
            content,
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'PUT',
            url: `/open-apis/im/v1/messages/${message_id}`,
            body,
        });
    },
};
exports.default = MessageEditOperate;
//# sourceMappingURL=MessageEditOperate.js.map