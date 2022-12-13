const {
	searchCoursesAndSections,
	getAllSchools,
	getAllDepartments,
	getDepartmentsBySchool
} = require("../../controllers/Search");

const express = require("express");
const router = express.Router();
//This post sends the signal to search the database for a particular course given a course query, and returns and prints the courses matching the query.
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

//This post sends the signal to search the database for all schools at Rutgers, and returns and prints them.
router.post("/schools", async (req, res) => {
	if (req.body) {
		const schools = await getAllSchools();

		res.json(schools);
		return;
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body) });
});
//This post sends the signal to search the database for all departments at Rutgers, as well as departmetns by school, and returns and prints them.
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