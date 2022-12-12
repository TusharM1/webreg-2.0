const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- UNAUTHENTICATED API ---

const unauthRouter = require("./routes/UnauthRouter");
app.use("/", unauthRouter);

// --- AUTHENTICATED API ---

const authRouter = require("./routes/auth/AuthRouter");
app.use("/", authRouter);

const db = require("./models");
const reload = false;
db.sequelize.sync({ force: reload, logging: false }).then(() => {
	app.listen(process.env.PORT, () => {
		console.log("Backend server initialized on port " + process.env.PORT);
	});
});