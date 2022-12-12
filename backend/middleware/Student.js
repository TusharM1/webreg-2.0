//This async function validates the user token to check whether or not the user is a student. If they are, they have access to student page and student rights, if not, they are thrown an error.
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