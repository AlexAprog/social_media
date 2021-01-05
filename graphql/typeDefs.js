const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment]
		likes: [Like]
		likeCount: Int!
		commentCount: Int!
	}
	type Query {
		getPosts: [Post]
		getPost(id: ID!): Post
	}
	type Comment {
		id: ID!
		body: String!
	}
	type Like {
		id: ID!
		username: String!
		createdAt: String!
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
		likePost(postId: ID!): Post!
	}
	type Subscription {
		newPost: Post!
	}
`;

module.exports = typeDefs;
