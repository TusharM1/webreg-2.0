const express = require("express");
const router = express.Router();

const authRouter = require("./Auth");
router.use("/auth", authRouter);

module.exports = router;