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

		console.log('referer: ', req.headers.referer);
		
		var refererToken = new URL(req.headers.referer).searchParams.get('accessToken');
		
		const token = req.headers.authorization || 'Bearer ' + refererToken;

		// try to retrieve a user with the token

		console.log('token: ',token);
		
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