"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const WikiSpacesNodeCreateOperate = {
    name: 'Create Wiki Space Node',
    value: 'wiki:spaces:node:create',
    order: 90,
    options: [
        {
            displayName: '知识空间ID',
            name: 'space_id',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: '文档类型',
            name: 'obj_type',
            type: 'options',
            options: [
                { name: '文档', value: 'docx' },
                { name: '表格', value: 'sheet' },
                { name: '思维导图', value: 'mindnote' },
                { name: '多维表格', value: 'bitable' },
                { name: '文件', value: 'file' },
            ],
            default: 'docx',
        },
        {
            displayName: '父节点Token',
            name: 'parent_node_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: '父节点token，一级节点为空',
        },
        {
            displayName: '节点类型',
            name: 'node_type',
            type: 'options',
            required: true,
            options: [
                { name: '实体', value: 'origin' },
                { name: '快捷方式', value: 'shortcut' },
            ],
            default: 'origin',
        },
        {
            displayName: '原始节点Token',
            name: 'origin_node_token',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: '快捷方式对应的实体node_token',
        },
        {
            displayName: '文档标题',
            name: 'title',
            type: 'string',
            default: '',
        },
    ],
    async call(index) {
        const spaceId = this.getNodeParameter('space_id', index);
        const objType = this.getNodeParameter('obj_type', index);
        const nodeType = this.getNodeParameter('node_type', index);
        const parentNodeToken = this.getNodeParameter('parent_node_token', index);
        const originNodeToken = this.getNodeParameter('origin_node_token', index);
        const title = this.getNodeParameter('title', index);
        const body = {
            obj_type: objType,
            node_type: nodeType,
        };
        if (parentNodeToken)
            body.parent_node_token = parentNodeToken;
        if (originNodeToken)
            body.origin_node_token = originNodeToken;
        if (title)
            body.title = title;
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
            body,
        });
    },
};
exports.default = WikiSpacesNodeCreateOperate;
//# sourceMappingURL=WikiSpacesNodeCreateOperate.js.map