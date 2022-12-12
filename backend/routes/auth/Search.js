const {
	searchCoursesAndSections,
	getAllSchools,
	getAllDepartments,
	getDepartmentsBySchool
} = require("../../controllers/Search");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	if (req.body) {
		const courseQuery = req.body["courseQuery"];
		const schoolNumber = req.body["schoolNumber"];
		const departmentNumber = req.body["departmentNumber"];
		if (courseQuery || schoolNumber || departmentNumber) {
			const courses = await searchCoursesAndSections(courseQuery, schoolNumber, departmentNumber);
			if (!courses || courses.error) {
				res.json({
					status: "failure",
					message: "Cannot search query: + " + courseQuery + ", error: " + JSON.stringify(courses.error)
				});
				return;
			}

			console.log("Requested course data for course query: " + courseQuery + ", found " + courses.length);

			res.json(courses);
			return;
		}
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body) });
});


router.post("/schools", async (req, res) => {
	if (req.body) {
		const schools = await getAllSchools();

		res.json(schools);
		return;
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body) });
});

router.post("/departments", async (req, res) => {
	if (req.body) {
		const schoolNumber = req.body["schoolNumber"];
		let schools;
		if (schoolNumber)
			schools = await getDepartmentsBySchool(schoolNumber);
		else
			schools = await getAllDepartments();

		res.json(schools);
		return;
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body) });
});


module.exports = router;