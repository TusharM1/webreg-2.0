const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    res.json({
        error: false,
        message: "Test message"
    });
});

module.exports = router;