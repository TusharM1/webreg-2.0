const express = require("express");
const { findSchoolEnrollment } = require("../../../controllers/student/SchoolEnrollments");
const router = express.Router();

router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findSchoolEnrollment(netID);
	res.json(result);
});

router.post("/add", async (req, res) => {
	res.json({
		message: "Add School Enrollment"
	});
});

router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove School Enrollment"
	});
});

module.exports = router;