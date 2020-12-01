const prisma = require('../../prismaClient');
const chechAuth = require('../../utils/chech-auth');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await prisma.post.findMany();
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getPost(_, { id }, ctx) {
			try {
				const Post = await ctx.prisma.post.findOne({
					where: {
						id: parseInt(id),
					},
				});

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

				return newPost;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
