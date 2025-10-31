"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const ExportDataTableToBitableOperate = {
    name: '导出多维表格',
    description: '导出数据到飞书多维表格',
    value: 'bitable:aggregate:copyDataTableToBitable',
    options: [
        {
            displayName: '多维表格 Token',
            name: 'app_toke',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格 App 的唯一标识。',
        },
        {
            displayName: '多维表格 ID',
            name: 'table_id',
            type: 'string',
            required: true,
            default: '',
            description: '多维表格数据表的唯一标识。',
        },
        {
            displayName: '是否自动映射字段',
            name: 'autoMapping',
            type: 'boolean',
            default: true,
        },
        {
            displayName: '导出的字段',
            name: 'fields',
            type: 'fixedCollection',
            default: [],
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    name: 'values',
                    displayName: '字段映射',
                    values: [
                        {
                            displayName: 'dataTable字段名称',
                            name: 'field',
                            type: 'string',
                            default: '',
                            requiresDataPath: 'single'
                        },
                        {
                            displayName: '飞书字段名称',
                            name: 'feishuField',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
            displayOptions: {
                show: {
                    autoMapping: [false],
                }
            }
        },
    ],
    async call(index) {
        const items = this.getInputData();
        const rows = items.map((item) => item.json);
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        if (rows.length === 0)
            return {};
        let autoMapping = this.getNodeParameter('autoMapping', index);
        let fieldMapping = {};
        if (!autoMapping) {
            let fieldOptions = this.getNodeParameter('fields', index);
            let fieldMappingList = fieldOptions.values;
            for (let fieldMappingItem of fieldMappingList) {
                fieldMapping[fieldMappingItem.field] = fieldMappingItem.feishuField;
            }
        }
        else {
            Object.keys(rows[0]).forEach((key) => {
                fieldMapping[key] = key;
            });
        }
        let records = [];
        for (const row of rows) {
            let fields = {};
            for (const field of Object.keys(fieldMapping)) {
                fields[fieldMapping[field]] = row[field];
            }
            records.push({
                fields: fields
            });
        }
        const qs = {};
        const body = {
            "records": records
        };
        return RequestUtils_1.default.request.call(this, {
            method: 'POST',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/batch_create`,
            qs,
            body: body
        });
    },
};
exports.default = ExportDataTableToBitableOperate;
//# sourceMappingURL=ExportDataTableToBitableOperate.js.map