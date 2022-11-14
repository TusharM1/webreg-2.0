const { getUserFromCredentials, getUserFromToken } = require("../controllers/User");

const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    const { data } = req.body;
    if (data) {
        const { type } = req.body;
        console.log("foo: " + type);
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
                                                    ", returning: " + JSON.stringify(user));
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
                                                            ", returning: " + JSON.stringify(user));
                // return
                res.json(user);
                return;
            }
        }
    }
    console.log("Invalid request body: " + req.body);
    res.json({ error: true, message: "Incorrect Credentials" });
});

module.exports = router;