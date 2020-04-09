const { RemoteGraphQLDataSource } = require('@apollo/gateway');

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
	
	var base64 = new Buffer(JSON.stringify(context.user)).toString('base64');
	console.log('bas64 user: ', base64);
	
    request.http.headers.set('x-user-data', base64);
  }
}
module.exports = AuthenticatedDataSource