const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./manager/dashboardRoutes");
const profileRoutes = require("./manager/profileRoutes");
const documentRoutes = require("./manager/documentRoutes");

router.use("/", dashboardRoutes);
router.use("/", profileRoutes);
router.use("/", documentRoutes);

module.exports = router;