const { updateCourseFunction } = require("../controllers/updateCourse");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    
    if (req.body){
        const confirmation = await updateCourseFunction(req.body['coursestring'], req.body['namE'], req.body['credits']);
        if (confirmation.error || !confirmation){
            res.json(confirmation);
            return;
        }

        console.log("Course updated:" + confirmation);
        res.json(confirmation);
        return;
    }
    
    
    
    console.log("Invalid request body: " + req.body);
    res.json({ error: true, message: "Something has gone wrong, try again?" });
});

module.exports = router;