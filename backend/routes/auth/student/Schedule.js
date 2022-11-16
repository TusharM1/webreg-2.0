const express = require("express");
const { findEnrollments } = require("../../../controllers/student/Schedule");
const { findCourse, findSection } = require("../../../controllers/Search");
const router = express.Router();

router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;

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