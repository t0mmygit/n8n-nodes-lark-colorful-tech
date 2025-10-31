"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '创建会议群',
    value: 'calendar:createEventMeetingChat',
    order: 70,
    options: [
        {
            displayName: '日历 ID',
            name: 'calendar_id',
            type: 'string',
            required: true,
            default: '',
            description: '日程所在的日历 ID。可以通过查询主日历信息、查询日历列表、搜索日历等接口获取。',
        },
        {
            displayName: '日程 ID',
            name: 'event_id',
            type: 'string',
            required: true,
            default: '',
            description: '日程 ID。可通过创建日程、获取日程列表、搜索日程等接口获取。',
        },
    ],
    async call(index) {
        const calendarId = this.getNodeParameter('calendar_id', index);
        const eventId = this.getNodeParameter('event_id', index);
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/calendar/v4/calendars/${calendarId}/events/${eventId}/meeting_chat`,
        });
    },
};
//# sourceMappingURL=CalendarEventGroupCreateOperate.js.map