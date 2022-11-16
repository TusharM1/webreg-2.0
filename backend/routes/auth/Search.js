const { searchCoursesAndSections } = require("../../controllers/Search");

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

module.exports = router;