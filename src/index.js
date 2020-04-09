const { ApolloServer, AuthenticationError } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const AuthenticatedDataSource = require('./authenticatedds');

const AuthAPI = require('./datasources/auth');
const api = new AuthAPI();

const dotenv = require('dotenv');
dotenv.config();

const gateway = new ApolloGateway({
	buildService({ name, url }) {
		return new AuthenticatedDataSource({ url });
	},
});

const server = new ApolloServer({
	gateway,
	engine: {
		apiKey: process.env.AGM_API_KEY,
		schemaTag: process.env.AGM_SCHEMA_TAG
	},
	subscriptions: false,
	context: async ({ req }) => {
		// Note! This example uses the `req` object to access headers,
		// but the arguments received by `context` vary by integration.
		// This means they will vary for Express, Koa, Lambda, etc.!
		//
		// To find out the correct arguments for a specific integration,
		// see the `context` option in the API reference for `apollo-server`:
		// https://www.apollographql.com/docs/apollo-server/api/apollo-server/

		// Get the user token from the headers.
		const token = req.headers.authorization || '';

		// try to retrieve a user with the token

		const user = await api.getUser(token);
		console.log('user: ', user);

		if (!user.authenticated) throw new AuthenticationError('Unauthorized: You must pass valid authorization token here.');

		// add the user to the context
		return { user };
	}
});

server.listen({ port: process.env.PORT || 4010 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});