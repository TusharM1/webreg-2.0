const express = require("express");
const router = express.Router();
//These routes are necessary for auth functionalities, that validate user info.
const authRouter = require("./Auth");
router.use("/auth", authRouter);

module.exports = router;