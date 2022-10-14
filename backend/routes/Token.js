const express = require("express");
const router = express.Router();

const tokens = new Set([
    "admin_token",
    "b"
])

router.post("/",  (req, res) => {
    console.log(req.body);
    process.stdout.write("Requested authentication for token: " + req.body.token + ", result: ");
    if (req.body) {
        const { token } = req.body;
        if (tokens.has(token)) {
            console.log("valid");
            res.json({ valid: true });
            return;
        }
    }
    console.log("invalid");
    res.json({ valid: false });
});

module.exports = router;