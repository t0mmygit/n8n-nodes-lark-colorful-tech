"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const MessageRecallOperate = {
    name: 'Recall Message',
    value: 'message:recall',
    options: [
        {
            displayName: '待撤回的消息的ID',
            name: 'message_id',
            type: 'string',
            required: true,
            default: '',
        },
    ],
    async call(index) {
        const message_id = this.getNodeParameter('message_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/im/v1/messages/${message_id}`,
        });
    },
};
exports.default = MessageRecallOperate;
//# sourceMappingURL=MessageRecallOperate.js.map