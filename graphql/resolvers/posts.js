const { UserInputError } = require('apollo-server-express');
const prisma = require('../../prismaClient');
const chechAuth = require('../../utils/chech-auth');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await prisma.post.findMany({
					include: {
						comments: true,
						likes: true,
					},
				});
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getPost(_, { id }, ctx) {
			try {
				const Post = await ctx.prisma.post.findUnique({
					where: {
						id: parseInt(id),
					},
					include: {
						comments: true,
						likes: true,
					},
				});
				console.log(Post);
				return Post;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Mutation: {
		async createPost(_, { body }, ctx) {
			const user = chechAuth(ctx);

			try {
				const newPost = ctx.prisma.post.create({
					data: {
						body,
						User: {
							connect: {
								id: user.id,
							},
						},
					},
				});

				ctx.pubsub.publish('NEW_POST', {
					newPost,
				});

				return newPost;
			} catch (err) {
				throw new Error(err);
			}
		},
		async likePost(_, { postId }, ctx) {
			const user = chechAuth(ctx);
			const post = await ctx.prisma.post.findUnique({
				where: {
					id: +postId,
				},
			});

			if (!post) {
				throw new UserInputError('post is not found');
			}

			const like = await ctx.prisma.like.findUnique({
				where: {
					id: +postId,
				},
			});

			try {
				if (like) await ctx.prisma.like.delete({ where: { id: +like.id } });
				else
					await ctx.prisma.like.create({
						data: {
							Post: {
								connect: {
									id: +postId,
								},
							},
							User: {
								connect: {
									id: +user.id,
								},
							},
						},
					});
			} catch (error) {
				throw new Error(error);
			}

			return post;
		},
	},
	Subscription: {
		newPost: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
		},
	},
};
