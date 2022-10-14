const express = require("express");
const router = express.Router();

const users = {
    admin: ["password", "admin_token"],
    f: ["f", "b"]
}

router.post("/",  (req, res) => {
    if (req.body) {
        const { username, password } = req.body;
        process.stdout.write("Requested token for username: " + username + ", password: " + password + ", returning token: ");
        if (username && password && users[username][0] === password) {
            res.json({ token: users[username][1] });
            console.log(users[username][1]);
            return;
        }
    }
    res.json({ token: "invalid" });
    console.log("invalid")
});

module.exports = router;