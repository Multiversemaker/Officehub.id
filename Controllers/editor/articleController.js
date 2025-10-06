const { getAllArticleEditor } = require("./article/listArticleController");
const {
  getArticleDetailsEditor,
} = require("./article/detailArticleController");
const {
  getCreateArticleEditor,
  getEditArticleEditor,
} = require("./article/formArticleController");
const {
  createArticleEditor,
  updateArticleEditor,
  deleteArticleEditor,
} = require("./article/crudArticleController");

module.exports = {
  getAllArticleEditor,
  getArticleDetailsEditor,
  getCreateArticleEditor,
  getEditArticleEditor,
  createArticleEditor,
  updateArticleEditor,
  deleteArticleEditor,
};
