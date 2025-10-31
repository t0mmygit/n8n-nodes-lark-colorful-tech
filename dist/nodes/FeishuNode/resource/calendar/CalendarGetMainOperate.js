"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '查询主日历信息',
    value: 'calendar:getPrimaryCalendar',
    order: 100,
    options: [
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
        const userIdType = this.getNodeParameter('user_id_type', index, 'open_id');
        const qs = {};
        if (userIdType) {
            qs.user_id_type = userIdType;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: '/open-apis/calendar/v4/calendars/primary',
            qs,
        });
    },
};
//# sourceMappingURL=CalendarGetMainOperate.js.map