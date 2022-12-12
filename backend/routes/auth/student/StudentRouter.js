const express = require("express");
const router = express.Router();

const studentMiddleware = require("../../../middleware/Student");
router.use(studentMiddleware);

const scheduleRouter = require("./Schedule");
router.use("/schedule", scheduleRouter);

const studyProgramsRouter = require("./StudyPrograms");
router.use("/programs", studyProgramsRouter);

const coursesRouter = require("./Courses");
router.use("/courses", coursesRouter);

const schoolEnrollmentRouter = require("./SchoolEnrollment");
router.use("/school", schoolEnrollmentRouter);

module.exports = router;