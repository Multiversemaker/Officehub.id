const express = require("express");
const router = express.Router();
const {
  loginPage,
  login,
  registerPage,
  register,
} = require("../Controllers/auth/authController");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", loginPage);
router.post("/login", login);
router.get("/register", registerPage);
router.post("/register", register);

module.exports = router;
