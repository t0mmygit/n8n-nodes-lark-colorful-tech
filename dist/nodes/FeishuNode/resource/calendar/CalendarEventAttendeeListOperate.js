"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '获取日程参与人列表',
    value: 'calendar:listEventAttendees',
    order: 80,
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
            displayName: '需要会议室表单信息',
            name: 'need_resource_customization',
            type: 'boolean',
            default: false,
        },
        {
            displayName: '分页标记',
            name: 'page_token',
            type: 'string',
            default: '',
            description: '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会返回新的page_token。',
        },
        {
            displayName: '每页数量',
            name: 'page_size',
            type: 'number',
            default: 20,
            description: '一次请求返回的最大日程参与人数量。最小值为10，最大值为100。',
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
    ],
    async call(index) {
        const calendarId = this.getNodeParameter('calendar_id', index);
        const eventId = this.getNodeParameter('event_id', index);
        const needResourceCustomization = this.getNodeParameter('need_resource_customization', index, false);
        const pageToken = this.getNodeParameter('page_token', index, '');
        const pageSize = this.getNodeParameter('page_size', index, 20);
        const userIdType = this.getNodeParameter('user_id_type', index, 'open_id');
        const qs = {};
        if (userIdType) {
            qs.user_id_type = userIdType;
        }
        if (needResourceCustomization !== undefined) {
            qs.need_resource_customization = needResourceCustomization;
        }
        if (pageToken) {
            qs.page_token = pageToken;
        }
        if (pageSize) {
            qs.page_size = pageSize;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/calendar/v4/calendars/${calendarId}/events/${eventId}/attendees`,
            qs,
        });
    },
};
//# sourceMappingURL=CalendarEventAttendeeListOperate.js.map