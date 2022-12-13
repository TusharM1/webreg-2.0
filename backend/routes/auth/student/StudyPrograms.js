const express = require("express");
const { findStudyPrograms } = require("../../../controllers/student/StudyPrograms");
const router = express.Router();

//This post is invoked when seeking degree study program(s) for any given student. It sends the signal to search the database for a student's degree study program.
router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findStudyPrograms(netID);
	res.json(result);
});
//This post is invoked when adding a degree study program(s) for any given student. It sends the signal to add to the database, a degree study program for a particular student.
router.post("/add", async (req, res) => {
	res.json({
		message: "Add Programs of Study"
	});
});
//This post is invoked when removing a degree study program(s) for any given student. It sends the signal to remove from the database, a degree study program for a particular student.
router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove Programs of Study"
	});
});

module.exports = router;