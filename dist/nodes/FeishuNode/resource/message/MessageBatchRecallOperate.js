"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const MessageBatchRecallOperate = {
    name: 'Batch recall message',
    value: 'message:batchRecall',
    options: [
        {
            displayName: '待撤回的批量消息任务ID',
            name: 'batch_message_id',
            type: 'string',
            required: true,
            default: '',
            description: '待撤回的批量消息任务 ID，该 ID 为批量发送消息接口返回值中的message_id字段，用于标识一次批量发送消息请求。',
        },
    ],
    async call(index) {
        const batch_message_id = this.getNodeParameter('batch_message_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/im/v1/batch_messages/${batch_message_id}`,
        });
    },
};
exports.default = MessageBatchRecallOperate;
//# sourceMappingURL=MessageBatchRecallOperate.js.map