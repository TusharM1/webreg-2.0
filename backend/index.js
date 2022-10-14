const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const loginRouter = require("./routes/Login");
const tokenRouter = require("./routes/Token");

app.use("/login", loginRouter);
app.use("/token", tokenRouter);

const db = require("./models");
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Backend server initialized on port 3001");
    });
});

