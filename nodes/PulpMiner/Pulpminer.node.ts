import type {
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Pulpminer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pulpminer',
		name: 'pulpminer',
		icon: 'file:logo_60_60.svg',
		group: ['input'],
		credentials: [{ required: true, name: 'pulpminerApi', displayName: 'Pulpminer API Key' }],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		version: 1,
		description: 'Consume Pulpminer Created API',
		defaults: {
			name: 'Pulpminer',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'API',
						value: 'api',
					},
				],
				default: 'api',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['api'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'GET',
						description: 'Use GET API',
						action: 'Use GET API',
					},
					{
						name: 'POST',
						value: 'POST',
						description: 'Use POST API',
						action: 'Use POST API',
					},
				],
				default: 'GET',
			},
			{
				displayName: 'API ID',
				name: 'apiId',
				type: 'number',
				required: true,
				hint: 'API id is the numberic value found after creating a Pulpminer API. It is the value that comes after the /external/ path.',

				displayOptions: {
					show: {
						resource: ['api'],
						operation: ['GET', 'POST'],
					},
				},
				default: 0,
			},
			{
				displayName: 'POST Request Body',
				name: 'postRequestBody',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['api'],
						operation: ['POST'],
					},
				},
				default: JSON.stringify({}),
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		// For each item, make an API call to create a contact
		for (let i = 0; i < items.length; i++) {
			if (resource === 'api') {
				// Get api id input
				const apiId = this.getNodeParameter('apiId', i) as number;

				// Get api method currently supports POST and GET
				const method = this.getNodeParameter('operation', i) as string;

				// Make HTTP request according to pulpminer api
				const options: IHttpRequestOptions = {
					headers: {
						'Content-Type': 'application/json',
					},

					url: `https://api.pulpminer.com/external/${apiId}`,
					method: method as IHttpRequestMethods,
				};

				if (method === 'POST') {
					const postBodyRequest = this.getNodeParameter('postRequestBody', i);
					options.body = postBodyRequest;
					options.json = true;
				}

				responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'pulpminerApi',
					options,
				);
				returnData.push(responseData);
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
