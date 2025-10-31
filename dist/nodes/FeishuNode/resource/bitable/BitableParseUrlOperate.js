"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const BitableParseUrlOperate = {
    name: '解析多维表格地址',
    value: 'bitable:parseUrl',
    order: 100,
    options: [
        {
            displayName: '多维表格地址',
            name: 'url',
            type: 'string',
            default: '',
            required: true,
        },
    ],
    async call(index) {
        var _a, _b;
        const url = this.getNodeParameter('url', index, '');
        let data = {
            app_token: null,
            table_id: null,
            view_id: null
        };
        let matches = url.match(/\/base\/(.*?)(\?|$)/);
        if (matches) {
            data.app_token = matches[1];
        }
        else {
            matches = url.match(/\/wiki\/(.*?)(\?|$)/);
            if (matches) {
                let wikiToken = matches[1];
                const res = await RequestUtils_1.default.request.call(this, {
                    method: 'GET',
                    url: '/open-apis/wiki/v2/spaces/get_node',
                    qs: {
                        token: wikiToken,
                        obj_type: 'wiki'
                    },
                });
                data.app_token = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.obj_token;
            }
        }
        matches = url.match(/table=(.*?)(&|$)/);
        if (matches) {
            data.table_id = matches[1];
        }
        matches = url.match(/view=(.*?)(&|$)/);
        if (matches) {
            data.view_id = matches[1];
        }
        return data;
    },
};
exports.default = BitableParseUrlOperate;
//# sourceMappingURL=BitableParseUrlOperate.js.map