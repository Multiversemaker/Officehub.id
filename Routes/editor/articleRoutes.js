const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const articleController = require("../../Controllers/editor/articleController");

router.get("/articles", articleController.getAllArticleEditor);
router.get("/articles/add-article", articleController.getCreateArticleEditor);
router.get(
  "/articles/edit-article/:judul",
  articleController.getEditArticleEditor
);
router.get("/articles/:judul", articleController.getArticleDetailsEditor);

router.post(
  "/articles",
  upload.single("image"),
  articleController.createArticleEditor
);
router.put(
  "/articles/:judul",
  upload.single("image"),
  articleController.updateArticleEditor
);
router.delete("/articles/:judul", articleController.deleteArticleEditor);

module.exports = router;
