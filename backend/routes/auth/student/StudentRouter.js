const express = require("express");
const router = express.Router();

const studentMiddleware = require("../../../middleware/Student");
router.use(studentMiddleware);

const scheduleRouter = require("./Schedule");
router.use("/schedule", scheduleRouter);

const studyProgramsRouter = require("./StudyPrograms");
router.use("/studyPrograms", studyProgramsRouter);

module.exports = router;