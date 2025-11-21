const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../Middlewares/isAuthenticated");

const { profilePage, getEditProfile } = require("../../Controllers/employee/profileController");


router.get("/profile", isAuthenticated, profilePage);
router.get("/edit-profile", isAuthenticated, getEditProfile);

module.exports = router;