const express = require("express");
const router = express.Router();


const dashboardRoutes = require("./employee/dashboardRoutes");
const profileRoutes = require("./employee/profileRoutes");
const eventRoutes = require("./employee/eventRoutes");
const articleRoutes = require("./employee/articleRoutes");
const documentRoutes = require("./employee/documentRoutes");

router.use("/", dashboardRoutes);
router.use("/", profileRoutes);
router.use("/", eventRoutes);
router.use("/", articleRoutes);
router.use("/", documentRoutes);

module.exports = router;