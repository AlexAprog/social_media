const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (ctx) => {
	const authHeader = ctx.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split('Bearer ')[1];
		console.log('token', token);
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY);
				console.log('user', user);
				return user;
			} catch (error) {
				throw new AuthenticationError(error);
			}
		}
		throw new Error('Authentication token must be "Bearer [token]"');
	}
	throw new Error('Authentication header must be provided');
};
