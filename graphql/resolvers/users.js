const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../../config');
const jwt = require('jsonwebtoken');
const { UserInputError, addErrorLoggingToSchema } = require('apollo-server-express');
const yup = require('yup');

const schema = yup.object().shape({
	username: yup.string().required().min(3, 'at least 3 simbol'),
	email: yup.string().email().required(),
	password: yup.string().required(),
	confirmPassword: yup.string().oneOf([yup.ref('password')]),
});

const schemaLogin = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const createToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			user: user.username,
			email: user.email,
		},
		SECRET_KEY,
		{ expiresIn: '1h' },
	);
};

module.exports = {
	Mutation: {
		async login(_, { email, password }, ctx) {
			try {
				await schemaLogin.validate({
					email,
					password,
				});
			} catch (error) {
				throw new UserInputError('Validate error', error);
			}

			const user = await ctx.prisma.user.findOne({
				where: {
					email,
				},
			});

			if (!user) {
				throw new Error('Invalid password or username');
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				throw new Error('Invalid password or username');
			}

			const token = createToken(user);
			return { ...user, token };
		},
		async register(_, { registerInput: { username, password, confirmPassword, email } }, ctx) {
			try {
				await schema.validate({
					username,
					password,
					email,
					confirmPassword,
				});
			} catch (err) {
				throw new UserInputError('Errors', err);
			}

			if (password != confirmPassword) {
				throw new Error("password and confirm password doesn't match");
			}
			const user = await ctx.prisma.user.findOne({
				where: {
					email,
				},
			});
			console.log('user', user);
			if (user) {
				throw new UserInputError('Email is already taken', {
					errors: {
						email: 'Email is already taken',
					},
				});
			}
			console.log('register');

			const newPassword = await bcrypt.hash(password, 10);

			try {
				const newUser = await ctx.prisma.user.create({
					data: {
						username,
						password: newPassword,
						email,
					},
				});
				const token = createToken(newUser);
				return { ...newUser, token };
			} catch (err) {
				console.log(err);
				throw new Error(err);
			}
		},
	},
};
