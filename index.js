const express = require('express');
const { ApolloServer } = require('apollo-server-express');
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

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		prisma,
		req,
	}),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
