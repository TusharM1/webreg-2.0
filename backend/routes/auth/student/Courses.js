const express = require("express");
const { findCompletedCourses, findAttemptingCourses } = require("../../../controllers/student/Courses");
const router = express.Router();
//This post is invoked when seeking previous enrollments for any given student. It sends the signal to find all completed courses.
router.post("/completed", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findCompletedCourses(netID);
	res.json(result);
});
//This post is invoked when seeking current enrollments for any given student. It sends the signal to find all currently enrolled courses.
router.post("/attempting", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findAttemptingCourses(netID);
	res.json(result);
});

module.exports = router;