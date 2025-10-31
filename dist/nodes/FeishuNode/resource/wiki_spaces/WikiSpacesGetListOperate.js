"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesGetListOperate = {
    name: 'Get Wiki Space List',
    value: 'wiki:spaces:list',
    order: 100,
    options: [
        {
            displayName: 'Page Size',
            name: 'page_size',
            type: 'number',
            default: 20,
            description: '分页大小，最大值50。',
        },
        {
            displayName: 'Page Token',
            name: 'page_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: '分页标记，第一次请求不填。',
        },
        {
            displayName: 'Language',
            name: 'lang',
            type: 'options',
            options: [
                { name: '简体中文', value: 'zh' },
                { name: '印尼语', value: 'id' },
                { name: '德语', value: 'de' },
                { name: '英语', value: 'en' },
                { name: '西班牙语', value: 'es' },
                { name: '法语', value: 'fr' },
                { name: '意大利语', value: 'it' },
                { name: '葡萄牙语', value: 'pt' },
                { name: '越南语', value: 'vi' },
                { name: '俄语', value: 'ru' },
                { name: '印地语', value: 'hi' },
                { name: '泰语', value: 'th' },
                { name: '韩语', value: 'ko' },
                { name: '日语', value: 'ja' },
                { name: '繁体中文（中国香港）', value: 'zh-HK' },
                { name: '繁体中文（中国台湾）', value: 'zh-TW' },
            ],
            default: 'en',
            description: '返回的文档库名称展示语言。',
        }
    ],
    async call(index) {
        const pageSize = this.getNodeParameter('page_size', index);
        const pageToken = this.getNodeParameter('page_token', index);
        const lang = this.getNodeParameter('lang', index);
        const qs = {
            page_size: pageSize,
            lang,
        };
        if (pageToken) {
            qs.page_token = pageToken;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: '/open-apis/wiki/v2/spaces',
            qs,
        });
    },
};
exports.default = WikiSpacesGetListOperate;
//# sourceMappingURL=WikiSpacesGetListOperate.js.map