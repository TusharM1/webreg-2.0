const { getUserFromCredentials, getUserFromToken} = require("../controllers/User");
const { getEditableSemestersFromUser } = require("../controllers/Semester");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {


    // if valid body
        // if type is login
            // get username and password
                // if error, return invalid body
        // else if type is token
            // get token
                // if error, return invalid body
        // create user json
        // return user
    // else
        // return invalid body


    const { data } = req.body;
    if (req.body) {
        const { type } = req.body;
        if (type === "login") {
            const { netID, password } = data;
            if (netID && password) {
                // get user data
                const user = await getUserFromCredentials(netID, password);
                if (user.error) {
                    res.json(user);
                    return;
                }

                // print user data
                console.log("Requested user data for netID: " + netID +
                                                    ", password: " + password +
                                                    ", returning: " + data);
                // return
                res.json(user);
                return;
            }
        }
        else if (type === "token") {
            const { token } = data;
            if (token) {
                // get user data
                const user = await getUserFromToken(token);
                if (user.error) {
                    res.json(user);
                    return;
                }

                // print user data
                console.log("Requested user data for token: " + token +
                                                            ", returning: " + "valid");
                // return
                res.json(user);
                return;
            }
        }
    }
    console.log("Invalid request body: " + req.body);
    res.json({ user: "invalid" });
});

module.exports = router;