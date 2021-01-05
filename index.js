const express = require('express');
const { createServer } = require('http');
const { ApolloServer, PubSub } = require('apollo-server-express');

const prisma = require('./PrismaClient');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// const createUser = async () => {
// 	return await prisma.user.create({
// 		data: {
// 			username: 'test2',
// 			password: '123456',
// 			email: 'test2@test.ru',
// 		},
// 	});
// };

// createUser()
// 	.then((user) => console.log(user))
// 	.catch((err) => console.log(err));

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		prisma,
		req,
		pubsub,
	}),
});

const app = express();
apolloServer.applyMiddleware({ app });

const server = createServer(app);
apolloServer.installSubscriptionHandlers(server);

const PORT = 4000;
server.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
	console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});
