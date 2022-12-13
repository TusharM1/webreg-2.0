const express = require("express");
const { findEnrollments, dropSection, addSection } = require("../../../controllers/student/Schedule");
const router = express.Router();
//This post is invoked when seeking current enrollments for any given student. It sends the signal to find all currently enrolled courses, to display a student's schedule.
router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;

	const enrollments = await findEnrollments(netID);

	res.json(enrollments);
});
//This post is invoked when seeking to enroll (add) in a course for any given student. It sends the signal to add a course to the student's enrollments.
router.post("/add", async (req, res) => {
	const netID = req.webreg_user.netID;

	if (req.body) {
		const sectionIndex = req.body["sectionIndex"];
		if (sectionIndex) {
			const confirmation = await addSection(netID, sectionIndex);
			if (confirmation && !confirmation.error) {
				res.json({
					status: "success",
					message: "Successfully added section: " + sectionIndex
				});
				return;
			}
		}
	}

	res.json({
		status: "failure",
		message: "Could not add section to schedule, invalid request body."
	});
});
//This post is invoked when seeking to drop a course for any given student. It sends the signal to drop a course from the student's enrollments.
router.post("/drop", async (req, res) => {
	const netID = req.webreg_user.netID;

	if (req.body) {
		const sectionIndex = req.body["sectionIndex"];
		if (sectionIndex) {
			const confirmation = await dropSection(netID, sectionIndex);
			if (confirmation && !confirmation.error) {
				res.json({
					status: "success",
					message: "Successfully removed section: " + sectionIndex
				});
				return;
			}
		}
	}

	res.json({
		status: "failure",
		message: "Could not add section to schedule, invalid request body."
	});
});

module.exports = router;