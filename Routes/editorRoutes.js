const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./editor/dashboardRoutes");
const eventRoutes = require("./editor/eventRoutes");
const articleRoutes = require("./editor/articleRoutes");
const profileRoutes = require("./editor/profileRoutes");

router.use("/", dashboardRoutes);
router.use("/", profileRoutes);
router.use("/", eventRoutes);
router.use("/", articleRoutes);

module.exports = router;