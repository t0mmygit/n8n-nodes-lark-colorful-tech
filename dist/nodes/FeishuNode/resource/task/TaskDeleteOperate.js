"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '删除任务',
    value: 'task:delete',
    order: 100,
    options: [
        {
            displayName: '任务ID',
            name: 'task_guid',
            type: 'string',
            required: true,
            default: '',
        }
    ],
    async call(index) {
        const task_guid = this.getNodeParameter('task_guid', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/task/v2/tasks/${task_guid}`
        });
    },
};
//# sourceMappingURL=TaskDeleteOperate.js.map