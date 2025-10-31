import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MessageSendOperate: ResourceOperations = {
	name: 'Send Message',
	value: 'message:send',
	options: [
		{
			displayName: 'Receive ID Type',
			name: 'receive_id_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{
					name: 'Open ID',
					value: 'open_id',
					description:
						'标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。了解更多：如何获取 Open ID',
				},
				{
					name: 'Union ID',
					value: 'union_id',
					description:
						'标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。了解更多：如何获取 Union ID？',
				},
				{
					name: 'User ID',
					value: 'user_id',
					description:
						'标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。了解更多：如何获取 User ID？',
				},
				{
					name: 'Email',
					value: 'email',
					description: '以用户的真实邮箱来标识用户。',
				},
				{
					name: 'Chat ID',
					value: 'chat_id',
					description: '以群 ID 来标识群聊。了解更多：如何获取群 ID',
				},
			],
			required: true,
			default: 'open_id',
		},
		{
			displayName: 'Receive ID',
			name: 'receive_id',
			type: 'string',
			default: '',
			description: 'ID 类型与查询参数 receive_id_type 的取值一致。',
		},
		{
			displayName: 'Message Type',
			name: 'msg_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Text', value: 'text' },
				{ name: 'Post', value: 'post' },
				{ name: 'Image', value: 'image' },
				{ name: 'File', value: 'file' },
				{ name: 'Audio', value: 'audio' },
				{ name: 'Media', value: 'media' },
				{ name: 'Sticker', value: 'sticker' },
				{ name: 'Interactive', value: 'interactive' },
				{ name: 'Share Chat', value: 'share_chat' },
				{ name: 'Share User', value: 'share_user' },
				{ name: 'System', value: 'system' },
			],
			description:
				'参考：https://open.feishu.cn/document/server-docs/im-v1/message-content-description/create_json',
			required: true,
			default: 'text',
		},
		{
			displayName: 'Content',
			name: 'content',
			type: 'json',
			default: '{"text":"test content"}',
			description: '消息内容，JSON 结构序列化后的字符串。该参数的取值与 msg_type 对应。',
			required: true,
		},
		{
			displayName: 'UUID',
			name: 'uuid',
			type: 'string',
			default: '',
			description: '自定义设置的唯一字符串序列，用于在发送消息时请求去重。',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const receive_id_type = this.getNodeParameter('receive_id_type', index) as string;
		const receive_id = this.getNodeParameter('receive_id', index) as string;
		const msg_type = this.getNodeParameter('msg_type', index) as string;
		const content = this.getNodeParameter('content', index) as object;
		const uuid = this.getNodeParameter('uuid', index) as string;

		const body: IDataObject = {
			receive_id,
			msg_type,
			content,
		};
		if (uuid) {
			body.uuid = uuid;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/im/v1/messages`,
			qs: {
				receive_id_type,
			},
			body,
		});
	},
};

export default MessageSendOperate;
