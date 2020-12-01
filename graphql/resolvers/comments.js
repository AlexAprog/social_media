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
	},
};
