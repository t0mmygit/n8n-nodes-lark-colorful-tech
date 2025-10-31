"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeUtils_1 = __importDefault(require("../../../help/utils/NodeUtils"));
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
exports.default = {
    name: '批量保存字段',
    value: 'bitable:table:field:batchSave',
    description: '只支持增量保存字段，最大100个',
    order: 60,
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
            displayName: '字段定义方式',
            name: 'type',
            type: 'options',
            default: 'field',
            options: [
                {
                    name: 'Field',
                    value: 'field',
                },
                {
                    name: 'JSON',
                    value: 'json',
                }
            ]
        },
        {
            displayName: '字段列表',
            name: 'fieldObject',
            type: 'fixedCollection',
            required: true,
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    name: 'fields',
                    displayName: '字段列表',
                    values: [
                        {
                            displayName: '字段名称',
                            name: 'field_name',
                            type: 'string',
                            default: '',
                            required: true,
                        },
                        {
                            displayName: '字段类型',
                            name: 'type',
                            type: 'options',
                            options: [
                                {
                                    name: '文本',
                                    value: 1,
                                },
                                {
                                    name: '数字',
                                    value: 2,
                                },
                                {
                                    name: '单选',
                                    value: 3,
                                },
                                {
                                    name: '多选',
                                    value: 4,
                                },
                                {
                                    name: '日期',
                                    value: 5,
                                },
                                {
                                    name: '复选框',
                                    value: 7,
                                },
                                {
                                    name: '人员',
                                    value: 11,
                                },
                                {
                                    name: '电话号码',
                                    value: 13,
                                },
                                {
                                    name: '超链接',
                                    value: 15,
                                },
                                {
                                    name: '附件',
                                    value: 17,
                                },
                                {
                                    name: '单项关联',
                                    value: 18,
                                },
                                {
                                    name: '公式',
                                    value: 20,
                                },
                                {
                                    name: '双向关联',
                                    value: 21,
                                },
                                {
                                    name: '地理位置',
                                    value: 22,
                                },
                                {
                                    name: '群组',
                                    value: 23,
                                },
                                {
                                    name: '创建时间',
                                    value: 1001,
                                },
                                {
                                    name: '最后更新时间',
                                    value: 1002,
                                },
                                {
                                    name: '创建人',
                                    value: 1003,
                                },
                                {
                                    name: '修改人',
                                    value: 1004,
                                },
                                {
                                    name: '自动编号',
                                    value: 1005,
                                },
                            ],
                            default: 1,
                        },
                        {
                            displayName: '字段扩展属性',
                            name: 'data',
                            type: 'json',
                            default: '{}',
                            description: '会自动合并，参考：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-field/create#requestBody',
                        },
                    ],
                },
            ],
            displayOptions: {
                show: {
                    type: ['field']
                }
            }
        },
        {
            displayName: '请求体JSON',
            name: 'body',
            type: 'json',
            required: true,
            default: '[{"field_name":"test", "type": 1}]',
            description: '参考：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-field/create#requestBody',
            displayOptions: {
                show: {
                    type: ['json']
                }
            }
        },
    ],
    async call(index) {
        const app_token = this.getNodeParameter('app_toke', index);
        const table_id = this.getNodeParameter('table_id', index);
        const type = this.getNodeParameter('type', index);
        let fieldList = [];
        if (type === "field") {
            const fieldObject = this.getNodeParameter('fieldObject', index);
            fieldList = NodeUtils_1.default.getNodeFixedCollection(fieldObject, 'fields');
        }
        else {
            fieldList = NodeUtils_1.default.getNodeJsonData(this, "body", index);
        }
        const newFieldList = [];
        for (const item of fieldList) {
            let newItem = {
                ...item,
                ...(item.data ? JSON.parse(item.data) : {}),
            };
            delete newItem.data;
            newFieldList.push(newItem);
        }
        const res = await RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields`,
            qs: {
                page_size: 100,
            },
        });
        const nowFieldList = res.data.items;
        const noExistFieldList = [];
        for (const item of newFieldList) {
            let flag = nowFieldList.find((f) => f.field_name === item.field_name);
            if (!flag) {
                noExistFieldList.push(item);
            }
        }
        let promises = [];
        for (const item of noExistFieldList) {
            promises.push(RequestUtils_1.default.request.call(this, {
                method: 'POST',
                url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields`,
                body: item,
            }));
        }
        await Promise.all(promises);
        return {
            addFields: noExistFieldList,
            oldFields: nowFieldList,
        };
    },
};
//# sourceMappingURL=BitableTableFieldBatchSaveOperate.js.map