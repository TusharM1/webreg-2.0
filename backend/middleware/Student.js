async function studentMiddleware(req, res, next) {
	if (req.webreg_user && req.webreg_user.role === "student") {
		next();
		return;
	}
	res.json({
		error: true,
		message: "Missing or Invalid Token"
	});
}

module.exports = studentMiddleware;