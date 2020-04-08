var requester = require('request');

class UserAPI {

	baseURL = '';

	constructor() {
		//constant url - generic BazaarVoice API returning constant data
		this.baseURL = 'https://dev.api.effem.com/oauth2-endpoint/v1/validateToken';
	}

	headers(token) {
		return {
			client_id: process.env.AUTH_CLIENT_ID,
			client_secret: process.env.AUTH_CLIENT_SECRET,
			scope: 'USER',
			Authorization: token
		}
	}

	async getUser(token) {
		const fetchConfig = {
			url: this.baseURL,
			method: 'GET',
			headers: this.headers(token)
		};

		console.log('fetch config: ', fetchConfig)
		
		var output = requester(fetchConfig, function(err, res, body) { 
			console.log('body: ', body);
			return JSON.parse(body);
		
			});
		
		//console.log('output: ', output)
			
		if (typeof output.authenticated === 'undefined') output.authenticated = false;
		//if (!output.authenticated) throw new AuthenticationError('You need to authorize against OAUTH endpoint first and passs here bearers token');
		return await output;

	}

}

module.exports = UserAPI;

