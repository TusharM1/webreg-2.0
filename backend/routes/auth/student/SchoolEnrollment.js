const express = require("express");
const { findSchoolEnrollment } = require("../../../controllers/student/SchoolEnrollments");
const router = express.Router();

//This post is invoked when seeking the respective school enrollment(s) for any given student. It sends the signal to search the database for a student's enrolled school.
router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;
	const result = await findSchoolEnrollment(netID);
	res.json(result);
});
//This post is invoked when adding a school enrollment to any given student. It sends the signal to add a school enrollment for a particular user in the database. 
router.post("/add", async (req, res) => {
	res.json({
		message: "Add School Enrollment"
	});
});
//This post is invoked when removing a school enrollment for any given student. It sends the signal to remove a school enrollment for a particular user in the database. 
router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove School Enrollment"
	});
});

module.exports = router;