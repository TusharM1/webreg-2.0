const express = require("express");
const { findEnrollments, dropSection, addSection } = require("../../../controllers/student/Schedule");
const router = express.Router();

router.post("/", async (req, res) => {
	const netID = req.webreg_user.netID;

	const enrollments = await findEnrollments(netID);

	res.json(enrollments);
});

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