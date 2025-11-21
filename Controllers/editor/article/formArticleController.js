const User = require("../../../Models/user");
const Article = require("../../../Models/article");

exports.getCreateArticleEditor = async (req, res) => {
  try {
    res.render("editor/pages/creates/create-article", {
      layout: "editor/layouts/create-update/crup-layout",
      title: "Add Article",
    });
  } catch (error) {
    console.error("Error loading create article page:", error);
    res.status(500).send("Server error");
  }
};

exports.getEditArticleEditor = async (req, res) => {
  try {
    const decodedJudul = decodeURIComponent(req.params.judul);
    const article = await Article.findOne({ judul: decodedJudul });

    if (!article) return res.status(404).send("Artikel tidak ditemukan");

    res.render("editor/pages/edits/edit-Article", {
      layout: "editor/layouts/create-update/crup-layout",
      title: "Edit Article",
      article,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengambil artikel untuk diedit");
  }
};
