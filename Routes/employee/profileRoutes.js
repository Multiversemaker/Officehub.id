const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../Middlewares/isAuthenticated");

const { profilePage } = require("../../Controllers/employee/profileController");


router.get("/profile", isAuthenticated, profilePage);

module.exports = router;