const gateway = new ApolloGateway();
const server = new ApolloServer({
  gateway,
  engine: {
    apiKey: process.env.AGM_API_KEY,
    schemaTag: process.env.AGM_SCHEMA_TAG
  }
});
