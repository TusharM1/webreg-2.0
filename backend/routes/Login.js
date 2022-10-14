const express = require("express");
const router = express.Router();

const users = {
    admin: ["password", "admin_token"]
}

router.post("/",  (req, res) => {
    if (req.body) {
        const { username, password } = req.body;
        console.log(username + " " + password);
        if (username && password && users[username][0] === password) {
            res.json({ token: users[username][1] });
            return;
        }
    }
    res.json({ token: 'invalid' });
});

module.exports = router;