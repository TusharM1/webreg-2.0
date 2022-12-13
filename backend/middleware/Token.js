const { User } = require("../models");

//This async function checks the current user's token against user tokens in the database, and on success assigns a particular existing user to the current user to fetch their relevant information.
async function tokenMiddleware(req, res, next) {
	if (req.body) {
		const { token } = req.body;
		if (token) {
			const user = (await User.findOne({
				where: {
					token: token
				}
			}));
			if (user) {
				req.webreg_user = user;
				next();
				return;
			}
		}
	}
	res.json({
		error: true,
		message: "Missing or Invalid Token"
	});
}

module.exports = tokenMiddleware;