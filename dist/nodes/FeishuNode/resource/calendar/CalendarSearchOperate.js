"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '搜索日历',
    value: 'calendar:search',
    options: [
        {
            displayName: '搜索关键字',
            name: 'query',
            type: 'string',
            required: true,
            default: '',
            description: '搜索关键字。接口将会搜索标题或描述中包含该关键字的公共日历或用户主日历。',
        },
        {
            displayName: '每页数量',
            name: 'page_size',
            type: 'number',
            default: 20,
            description: '一次请求返回的最大日历数量。最大值：50',
        },
        {
            displayName: '分页标记',
            name: 'page_token',
            type: 'string',
            default: '',
            description: '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
        },
    ],
    async call(index) {
        const query = this.getNodeParameter('query', index);
        const pageSize = this.getNodeParameter('page_size', index, 20);
        const pageToken = this.getNodeParameter('page_token', index, '');
        const body = { query };
        const qs = {};
        if (pageSize)
            qs.page_size = pageSize;
        if (pageToken)
            qs.page_token = pageToken;
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: '/open-apis/calendar/v4/calendars/search',
            qs,
            body
        });
    },
};
//# sourceMappingURL=CalendarSearchOperate.js.map