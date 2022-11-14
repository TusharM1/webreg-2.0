const { searchCoursesAndSections } = require("../controllers/Search");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    if (req.body) {
        const courseQuery = req.body["courseQuery"];
        if (courseQuery) {
            // get class data
            const course = await searchCoursesAndSections(courseQuery);
            if (course.error || !course) {
                res.json(course);
                return;
            }

            console.log("Requested course data for course query: " + courseQuery + ", found " + course.length);

            res.json(course);
            return;
        }
    }
    console.log("Invalid request body: " + req.body);
    res.json({ error: true, message: "Incorrect Credentials" });
});

module.exports = router;