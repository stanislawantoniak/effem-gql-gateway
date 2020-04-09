var fetch = require('node-fetch');

class AuthAPI {

	baseURL = '';

	constructor() {
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
			
		return fetch(this.baseURL, fetchConfig)
				.then(res => res.json())
				.then(function(json){if (typeof json.authenticated === 'undefined') json.authenticated = false; return json});

	}

}

module.exports = AuthAPI;

