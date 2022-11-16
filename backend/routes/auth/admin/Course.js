const { createCourse, editCourse, removeCourse } = require("../../../controllers/admin/Course");

const express = require("express");
const { courseNumbersToString } = require("../../../controllers/admin/Course");
const router = express.Router();

router.post("/create", async (req, res) => {
	if (req.body) {
		const schoolNumber = req.body["schoolNumber"];
		const departmentNumber = req.body["departmentNumber"];
		const courseNumber = req.body["courseNumber"];
		const courseName = req.body["courseName"];
		const numberOfCredits = req.body["numberOfCredits"];

		if (schoolNumber && departmentNumber && courseNumber && courseName && numberOfCredits) {
			const confirmation = await createCourse(schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits);
			if (!confirmation || confirmation.error) {
				res.json({
					status: "failure",
					message: "Unsuccessfully created course, error: " + JSON.stringify(confirmation.error)
				});
				return;
			}

			console.log(`Created course ${courseName} ` + `(${courseNumbersToString(schoolNumber, departmentNumber, courseNumber)}, ` + `${numberOfCredits})`);
			res.json({ status: "success", message: "Successfully created course" });
			return;
		}
	}

	res.json({ status: "failure", message: "Invalid request body: " + JSON.stringify(req.body) });
});

router.post("/edit", async (req, res) => {
	if (req.body) {
		const schoolNumber = req.body["schoolNumber"];
		const departmentNumber = req.body["departmentNumber"];
		const courseNumber = req.body["courseNumber"];
		const courseName = req.body["courseName"];
		const numberOfCredits = req.body["numberOfCredits"];

		if (schoolNumber && departmentNumber && courseNumber && courseName && numberOfCredits) {
			const confirmation = await editCourse(schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits);
			if (!confirmation || confirmation.error) {
				res.json({
					status: "failure",
					message: "Unsuccessfully edited course, error: " + JSON.stringify(confirmation.error)
				});
				return;
			}

			console.log(`Edited course ${courseName} ` + `(${courseNumbersToString(schoolNumber, departmentNumber, courseNumber)}, ` + `${numberOfCredits})`);
			res.json({ status: "success", message: "Successfully edited course" });
			return;
		}
	}

	res.json({ status: "failure", message: "Invalid request body: " + JSON.stringify(req.body) });
});

router.post("/remove", async (req, res) => {
	if (req.body) {
		const schoolNumber = req.body["schoolNumber"];
		const departmentNumber = req.body["departmentNumber"];
		const courseNumber = req.body["courseNumber"];

		if (schoolNumber && departmentNumber && courseNumber) {
			const confirmation = await removeCourse(schoolNumber, departmentNumber, courseNumber);
			if (!confirmation || confirmation.error) {
				res.json({
					status: "failure",
					message: "Unsuccessfully removed course, error: " + JSON.stringify(confirmation.error)
				});
				return;
			}

			console.log(`Removed course (${courseNumbersToString(schoolNumber, departmentNumber, courseNumber)})`);
			res.json({ status: "success", message: "Successfully removed course" });
			return;
		}
	}

	res.json({ status: "failure", message: "Invalid request body: " + JSON.stringify(req.body) });
});

module.exports = router;