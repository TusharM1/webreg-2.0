const { User } = require("../models");

async function studentMiddleware(req, res, next) {
	if (req.body) {
		const { token } = req.body;
		if (token) {
			const user = (await User.findOne({
				where: {
					token: token
				}
			}));
			if (user && user.role === "student") {
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

module.exports = studentMiddleware;