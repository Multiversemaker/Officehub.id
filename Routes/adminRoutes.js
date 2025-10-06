const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./admin/dashboardRoutes");
const documentRoutes = require("./admin/documentRoutes");
const userNManageRoutes = require("./admin/userManagementRoutes");

router.use("/", dashboardRoutes);
router.use("/", documentRoutes);
router.use("/", userNManageRoutes);

module.exports = router;
