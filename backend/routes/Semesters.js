const { getUserFromCredentials, getUserFromToken} = require("../controllers/User");
const { getEditableSemestersFromUser } = require("../controllers/Semester");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    const { data } = req.body;
    if (req.body) {
        const { token } = req.body;
        if (token) {
            // add semester data
            const semesters = await getEditableSemestersFromUser(token);

            // print user data
            console.log("Requested semester data for token: " + token +
                                                ", returning: " + data);
            // return
            res.json(semesters);
            return;
        }
    }
    console.log("Invalid request body: " + req.body);
    res.json({ semesters: "invalid" });
});

module.exports = router;