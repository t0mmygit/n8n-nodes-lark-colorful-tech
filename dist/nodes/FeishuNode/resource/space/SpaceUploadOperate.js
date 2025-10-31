"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const n8n_workflow_1 = require("n8n-workflow");
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
exports.default = {
    name: '上传素材',
    value: 'space:upload',
    order: 50,
    options: [
        {
            displayName: '上传点的类型',
            name: 'parent_type',
            type: 'options',
            options: [
                {
                    name: '旧版文档图片',
                    value: 'doc_image',
                },
                {
                    name: '新版文档图片',
                    value: 'docx_image',
                },
                {
                    name: '电子表格图片',
                    value: 'sheet_image',
                },
                {
                    name: '旧版文档文件',
                    value: 'doc_file',
                },
                {
                    name: '新版文档文件',
                    value: 'docx_file',
                },
                {
                    name: '电子表格文件',
                    value: 'sheet_file',
                },
                {
                    name: 'Vc 虚拟背景（灰度中，暂未开放）',
                    value: 'vc_virtual_background',
                },
                {
                    name: '多维表格图片',
                    value: 'bitable_image',
                },
                {
                    name: '多维表格文件',
                    value: 'bitable_file',
                },
                {
                    name: '同事圈（灰度中，暂未开放）',
                    value: 'moments',
                },
                {
                    name: '云文档导入文件',
                    value: 'ccm_import_open',
                },
            ],
            required: true,
            default: 'docx_image',
        },
        {
            displayName: '上传点的 Token',
            name: 'parent_node',
            type: 'string',
            default: '',
            required: true,
        },
        {
            displayName: '二进制文件字段',
            name: 'fileFieldName',
            type: 'string',
            default: 'file',
            required: true,
        },
        {
            displayName: '文件名称',
            name: 'file_name',
            type: 'string',
            default: '',
        },
    ],
    async call(index) {
        const file_name = this.getNodeParameter('file_name', index);
        const parent_type = this.getNodeParameter('parent_type', index);
        const parent_node = this.getNodeParameter('parent_node', index);
        const fileFieldName = this.getNodeParameter('fileFieldName', index);
        const file = await NodeUtils_1.default.buildUploadFileData.call(this, fileFieldName, index);
        const fileName = file_name ? file_name : file.options.filename;
        if (!fileName) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No file name given for media upload.');
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/drive/v1/medias/upload_all`,
            formData: {
                file_name: fileName,
                parent_type,
                parent_node,
                size: file.value.length,
                file: file
            },
        });
    },
};
//# sourceMappingURL=SpaceUploadOperate.js.map