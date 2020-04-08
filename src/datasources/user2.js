var fetch = require('node-fetch');

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
				method: 'GET',
				headers: this.headers(token)
		};

		console.log('fetch config: ', fetchConfig)
		
		let output = await fetch(this.baseURL, fetchConfig)
				.then(res => res.json())
				.then(function(json){if (typeof json.authenticated === 'undefined') json.authenticated = false; return json})
				.then(output => console.log('getUser output: ',output));
			
		return output;

	}

}

module.exports = UserAPI;

