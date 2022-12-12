//This async function validates the user token to check whether or not the user is an admin. If they are, they have access to admin page and admin rights, if not, they are returned to student page.
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
