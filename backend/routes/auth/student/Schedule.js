const express = require("express");
const { getUserFromToken } = require("../../../controllers/User");
const { findEnrollments } = require("../../../controllers/student/Schedule");
const router = express.Router();

router.post("/", async (req, res) => {
	const { token } = req.body;
	const { netID } = await getUserFromToken(token);
	const enrollments = await findEnrollments(netID);

	res.json(enrollments);
});

router.post("/add", async (req, res) => {
	res.json({
		message: "Add course to schedule"
	});
});

router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove course from schedule"
	});
});

module.exports = router;