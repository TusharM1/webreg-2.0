const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const tokenMiddleware = require("./middleware/Token")
app.use(tokenMiddleware);

const searchRouter = require("./routes/Search");
app.use("/search", searchRouter);

const scheduleRouter = require("./routes/Schedule");
app.use("/schedule", scheduleRouter);

const studyProgramsRouter = require("./routes/StudyPrograms");
app.use("/studyPrograms", studyProgramsRouter);

const createCourseRouter = require("./routes/createCourse");
app.use("/createCourse", createCourseRouter);

const removeCourseRouter = require("./routes/removeCourse");
app.use("/removeCourse", removeCourseRouter);

const updateCourseRouter = require("./routes/updateCourse");
app.use("/updateCourse", updateCourseRouter);

// TODO implement semesters
// const semesterRouter = require("./routes/Semesters");
// app.use("/semesters", semesterRouter);

const db = require("./models");
const reload = false;
db.sequelize.sync({ force: reload, logging: false }).then(() => {
    app.listen(3001, () => {
        console.log("Backend server initialized on port 3001");
    });
});