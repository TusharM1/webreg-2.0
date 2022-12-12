const express = require("express");
const { findStudyPrograms } = require("../../../controllers/student/StudyPrograms");
const router = express.Router();

router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findStudyPrograms(netID);
	res.json(result);
});

router.post("/add", async (req, res) => {
	res.json({
		message: "Add Programs of Study"
	});
});

router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove Programs of Study"
	});
});

module.exports = router;