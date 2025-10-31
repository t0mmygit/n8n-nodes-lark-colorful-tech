"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '解绑会议群',
    value: 'calendar:unbindEventMeetingChat',
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
        {
            displayName: '会议群 ID',
            name: 'meeting_chat_id',
            type: 'string',
            required: true,
            default: '',
            description: '会议群 ID。在创建会议群时会返回会议群 ID。',
        }
    ],
    async call(index) {
        const calendarId = this.getNodeParameter('calendar_id', index);
        const eventId = this.getNodeParameter('event_id', index);
        const meetingChatId = this.getNodeParameter('meeting_chat_id', index);
        const qs = {};
        if (meetingChatId) {
            qs.meeting_chat_id = meetingChatId;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'DELETE',
            url: `/open-apis/calendar/v4/calendars/${calendarId}/events/${eventId}/meeting_chat`,
            qs,
        });
    },
};
//# sourceMappingURL=CalendarEventGroupDeleteOperate.js.map