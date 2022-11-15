const { removeCourseFunction } = require("../controllers/removeCourse");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    
    if (req.body){
        const confirmation = await removeCourseFunction(req.body['coursestring']);
        if (confirmation.error || !confirmation){
            res.json(confirmation);
            return;
        }

        console.log("Course removed from Table:" + confirmation);
        res.json(confirmation);
        return;
    }
    
    
    
    console.log("Invalid request body: " + req.body);
    res.json({ error: true, message: "Something has gone wrong, try again?" });
});

module.exports = router;