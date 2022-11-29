const express = require("express");
const router = express.Router();

const adminMiddleware = require("../../../middleware/Admin");
router.use(adminMiddleware);

const adminCourseRouter = require("./Course");
router.use("/course", adminCourseRouter);

module.exports = router;