import { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class PulpminerApi implements ICredentialType {
	name = 'pulpminerApi';
	displayName = 'Pulpminer API';
	documentationUrl = 'https://docs.pulpminer.com/essentials/api-keys';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apikey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials.apikey}}',
			},
		},
	};
	icon?: Icon | undefined = {
		light: 'file:logo_60_60.svg',
		dark: 'file:logo_60_60.svg',
	};
}
