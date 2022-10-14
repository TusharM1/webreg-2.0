const express = require("express");
const router = express.Router();

const tokens = new Set(["admin_token"])

router.post("/",  (req, res) => {
    if (req.body) {
        const { token } = req.body;
        console.log("Requested authentication for token: " + token);
        if (tokens.has(token)) {
            res.json({ valid: true });
            return;
        }
    }
    res.json({ valid: false });
});

module.exports = router;