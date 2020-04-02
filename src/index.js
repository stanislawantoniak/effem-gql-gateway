const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const dotenv = require('dotenv');
dotenv.config();

console.log('api key: ', process.env.AGM_API_KEY);

const gateway = new ApolloGateway();

const server = new ApolloServer({
	gateway,
	engine: {
		apiKey: process.env.AGM_API_KEY,
		schemaTag: process.env.AGM_SCHEMA_TAG
	},
	subscriptions: false,
});

server.listen({ port: process.env.PORT || 4010 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});