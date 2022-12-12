const express = require("express");
const { findCompletedCourses, findAttemptingCourses } = require("../../../controllers/student/Courses");
const router = express.Router();

router.post("/completed", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findCompletedCourses(netID);
	res.json(result);
});

router.post("/attempting", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findAttemptingCourses(netID);
	res.json(result);
});

module.exports = router;