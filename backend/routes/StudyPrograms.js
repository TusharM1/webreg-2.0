const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	res.json({
		message: "View Programs of Study"
	});
});

router.post("/add", async (req, res) => {
	res.json({
		message: "Add Programs of Study"
	});
});

router.post("/remove", async (req, res) => {
	res.json({
		message: "Remove Programs of Study"
	});
});

module.exports = router;