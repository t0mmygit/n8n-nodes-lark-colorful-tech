"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesNodeGetInfoOperate = {
    name: 'Get Wiki Space Node Info',
    value: 'wiki:spaces:node:info',
    order: 90,
    options: [
        {
            displayName: '节点Token',
            name: 'token',
            type: 'string',
            typeOptions: { password: true },
            required: true,
            default: '',
            description: '知识库节点或对应云文档的实际token',
        },
        {
            displayName: '文档类型',
            name: 'obj_type',
            type: 'options',
            options: [
                { name: '知识库节点', value: 'wiki' },
                { name: '旧版文档', value: 'doc' },
                { name: '新版文档', value: 'docx' },
                { name: '表格', value: 'sheet' },
                { name: '思维导图', value: 'mindnote' },
                { name: '多维表格', value: 'bitable' },
                { name: '文件', value: 'file' },
                { name: '幻灯片', value: 'slides' }
            ],
            default: 'wiki',
            description: '文档类型，不传时默认以wiki类型查询',
        }
    ],
    async call(index) {
        const token = this.getNodeParameter('token', index);
        const objType = this.getNodeParameter('obj_type', index);
        const qs = {
            token,
        };
        if (objType !== 'wiki') {
            qs.obj_type = objType;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: '/open-apis/wiki/v2/spaces/get_node',
            qs,
        });
    },
};
exports.default = WikiSpacesNodeGetInfoOperate;
//# sourceMappingURL=WikiSpacesNodeGetInfoOperate.js.map