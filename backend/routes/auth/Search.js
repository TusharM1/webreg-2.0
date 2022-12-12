const { searchCoursesAndSections, getAllSchools, getAllDepartments } = require("../../controllers/Search");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	if (req.body) {
		const courseQuery = req.body["courseQuery"];
		if (courseQuery) {
			const courses = await searchCoursesAndSections(courseQuery);
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

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body)});
});


router.post("/schools", async (req, res) => {
	if (req.body) {
		const schools = await getAllSchools();

		res.json(schools);
		return;
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body)});
});

router.post("/departments", async (req, res) => {
	if (req.body) {
		// const school = req.body["school"];
		// let schools;
		// if (school)
		// 	schools = await getDepartmentBySchool(school);
		// else
		// 	schools = await getAllDepartments();

		const schools = await getAllDepartments();

		res.json(schools);
		return;
	}

	res.json({ error: true, message: "Invalid request body: " + JSON.stringify(req.body)});
});



module.exports = router;