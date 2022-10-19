const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const semesterRouter = require("./routes/Semesters");
app.use("/semesters", semesterRouter);

const db = require("./models");
const reload = false;
db.sequelize.sync({ force: reload, logging: false }).then(() => {
    app.listen(3001, () => {
        console.log("Backend server initialized on port 3001");
    });
});