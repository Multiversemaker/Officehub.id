const express = require("express");
const router = express.Router();

const { homePage } = require("../../Controllers/manager/dashboardController");

router.get("/dashboard", homePage);

module.exports = router;
