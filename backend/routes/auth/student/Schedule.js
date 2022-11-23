const express = require("express");
const { findEnrollments } = require("../../../controllers/student/Schedule");
const { findCourse, findSection } = require("../../../controllers/Search");
const { removeCourse } = require("../../../controllers/student/Course");
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
	const netID = req.webreg_user.netID;

	if (req.body){
		const courseString = req.body['courseString'];
		if (courseString){
			const confirmation = await removeCourse(netID,courseString);
			if (!confirmation || confirmation.error) {
				res.json({
					status: "failure",
					message: "Unsuccessfully removed course, error: " + JSON.stringify(confirmation.error)
				});
				return;
			}
		}
		
	}

	res.json({
		message: "Remove course from schedule"
	});
});

module.exports = router;