const express = require("express");
const router = express.Router();

const {
  getAllArticleEmployee,
  getArticleDetailsEmployee,
} = require("../../Controllers/employee/articleController");

router.get("/articles", getAllArticleEmployee);
router.get("/articles/:judul", getArticleDetailsEmployee);

module.exports = router;