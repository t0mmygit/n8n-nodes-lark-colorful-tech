"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestUtils_1 = __importDefault(require("../../../help/utils/RequestUtils"));
const UserGetInfoOperate = {
    name: '获取用户信息',
    value: 'user:get',
    options: [
        {
            displayName: '用户ID类型',
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
        {
            displayName: '用户ID',
            name: 'user_id',
            type: 'string',
            required: true,
            default: '',
            description: '用户ID。ID 类型与查询参数 user_id_type 保持一致。',
        },
        {
            displayName: '部门ID类型',
            name: 'department_id_type',
            type: 'options',
            options: [
                { name: 'Department ID', value: 'department_id' },
                { name: 'Open Department ID', value: 'open_department_id' },
            ],
            description: '指定查询结果中的部门 ID 类型。',
            default: 'open_department_id',
        },
    ],
    async call(index) {
        const user_id = this.getNodeParameter('user_id', index);
        const user_id_type = this.getNodeParameter('user_id_type', index);
        const department_id_type = this.getNodeParameter('department_id_type', index);
        const qs = {};
        if (user_id_type) {
            qs.user_id_type = user_id_type;
        }
        if (department_id_type) {
            qs.department_id_type = department_id_type;
        }
        return RequestUtils_1.default.request.call(this, {
            method: 'GET',
            url: `/open-apis/contact/v3/users/${user_id}`,
            qs: qs,
        });
    }
};
exports.default = UserGetInfoOperate;
//# sourceMappingURL=UserGetInfoOperate.js.map