const { getSearchedCourses } = require("../controllers/Searching");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    const { data } = req.body;
    if (req.body) {
            //console.log(req.body);
            console.log(req.body["courseString"]);
            const courseName = req.body["courseString"];
            console.log("searching for: " + courseName);
            if (courseName) {
                // get class data
                const course = await getSearchedCourses(courseName);
                if (course.error) {
                    res.json(course);
                    return;
                }
                console.log(course);
                // print user data
                console.log("Requested course data for course name: " + courseName +
                                                    ", returning: " + JSON.stringify(course));
                // return
                res.json(course);
                return;
            }
        
    }
    console.log("Invalid request body: " + req.body);
    res.json({ error: true, message: "Incorrect Credentials" });
});

module.exports = router;