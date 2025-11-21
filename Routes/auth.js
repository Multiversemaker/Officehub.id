const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth/authController");
const upload = require("../Middlewares/upload");

router.get("/",authController.redirectToLogin);
router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/register", authController.registerPage);
router.post("/register", upload.single("photo"), authController.register);
router.get("/auth/dropbox",authController.redirectToDropbox);
router.get("/auth/dropbox/callback", authController.dropboxCallback);

module.exports = router;
