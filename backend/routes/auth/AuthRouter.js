const express = require("express");
const router = express.Router();
// --- TOKEN API ---
const tokenMiddleware = require("../../middleware/Token");
router.use(tokenMiddleware);

// --- COMMON API ---

const searchRouter = require("./Search");
router.use("/search", searchRouter);

// --- STUDENT API ---

const studentRouter = require("./student/StudentRouter");
router.use("/student", studentRouter);

// --- ADMIN API ---

const adminRouter = require("./admin/AdminRouter");
router.use("/admin", adminRouter);

module.exports = router;