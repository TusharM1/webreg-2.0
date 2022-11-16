async function adminMiddleware(req, res, next) {
	if (req.webreg_user && req.webreg_user.role === "admin") {
		next();
		return;
	}
	res.json({
		error: true,
		message: "Missing or Invalid Token"
	});
}

module.exports = adminMiddleware;
