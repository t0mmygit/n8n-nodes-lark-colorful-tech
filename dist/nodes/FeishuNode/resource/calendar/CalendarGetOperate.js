"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '查询日历信息',
    value: 'calendar:get',
    options: [
        {
            displayName: '日历 ID',
            name: 'calendar_id',
            type: 'string',
            required: true,
            default: '',
            description: '日历 ID。可以通过查询主日历信息、查询日历列表、搜索日历等接口获取。',
        },
    ],
    async call(index) {
        const calendarId = this.getNodeParameter('calendar_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/calendar/v4/calendars/${calendarId}`,
        });
    },
};
//# sourceMappingURL=CalendarGetOperate.js.map