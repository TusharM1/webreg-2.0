const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const loginRouter = require("./routes/Login");
app.use("/login", loginRouter);

const tokenRouter = require("./routes/Token");
app.use("/token", tokenRouter);

app.listen(3001, () => {
    console.log("Backend server initialized on port 3001");
})

// app.post("/login", (req, res) => {
//     const username = req.get("username");
//     const password = req.get("password");
//     console.log(`Login request with ${username} and ${password} from ${req.body}`);
//     console.log(req.body);
//     res.send("here");
// });