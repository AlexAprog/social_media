const { AuthenticationError } = require('apollo-server-express');
const chechAuth = require('../../utils/chech-auth');

module.exports = {
	Mutation: {
		async createComment(_, { body, postId }, ctx) {
			const user = chechAuth(ctx);
			try {
				const comment = await ctx.prisma.comment.create({
					data: {
						body,
						Post: {
							connect: {
								id: +postId,
							},
						},
						User: {
							connect: {
								id: user.id,
							},
						},
					},
				});

				return comment;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteComment: async function (_, { commentId }, ctx) {
			const user = chechAuth(ctx);
			const comment = await ctx.prisma.comment.findUnique({
				where: {
					id: +commentId,
				},
			});

			if (!comment) {
				throw new Error('Comment to delete does not exist');
			}

			if (comment.userId != user.id) {
				throw new AuthenticationError('Comment can delete the only creator');
			}

			try {
				const comment = await ctx.prisma.comment.delete({
					where: {
						id: +commentId,
					},
				});
				return comment;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};
