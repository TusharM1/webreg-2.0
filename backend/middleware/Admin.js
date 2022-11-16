const { User } = require("../models");

async function adminMiddleware(req, res, next) {
	if (req.body) {
		const { token } = req.body;
		if (token) {
			const user = (await User.findOne({
				where: {
					token: token
				}
			}));
			if (user && user.role === "admin") {
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

module.exports = adminMiddleware;