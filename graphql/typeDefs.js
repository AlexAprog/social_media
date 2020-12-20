const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment!]
	}
	type Query {
		getPosts: [Post]
		getPost(id: ID!): Post
	}
	type Comment {
		id: ID!
		body: String!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		password: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(email: String!, password: String): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String): Comment!
		deleteComment(commentId: ID!): Comment!
	}
`;

module.exports = typeDefs;
