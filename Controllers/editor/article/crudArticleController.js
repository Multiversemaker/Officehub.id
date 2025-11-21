const Article = require("../../../Models/article");

exports.createArticleEditor = async (req, res) => {
  try {
    const { judul, informasi } = req.body;

    const newArticle = new Article({
      judul,
      tanggal: new Date(),
      penulis: req.session.user ? req.session.user.nama : "Unknown",
      ringkasan: informasi.replace(/<[^>]*>?/gm, "").slice(0, 200),
      informasi,
      image: req.file ? `/uploads/documents/${req.file.filename}` : "",
    });

    await newArticle.save();
    res.redirect("/editor/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal membuat artikel");
  }
};

exports.updateArticleEditor = async (req, res) => {
  try {
    const decodedJudul = decodeURIComponent(req.params.judul);
    const oldJudul = req.body.oldJudul || decodedJudul;

    const updateFields = {
      judul: req.body.judul,
      informasi: req.body.informasi,
      ringkasan: req.body.informasi.replace(/<[^>]*>?/gm, "").slice(0, 200),
      tanggal: new Date(),
      penulis: req.session.user.nama,
    };

    if (req.file) {
      updateFields.image = "/uploads/" + req.file.filename;
    }

    await Article.updateOne({ judul: oldJudul }, { $set: updateFields });

    req.flash("msg", "Artikel berhasil diupdate");
    res.redirect("/editor/articles");
  } catch (error) {
    console.error(error);
    res.status(500).send("Gagal mengupdate artikel");
  }
};

exports.deleteArticleEditor = async (req, res) => {
  try {
    const decodedJudul = decodeURIComponent(req.params.judul);
    const deleted = await Article.deleteOne({ judul: decodedJudul });

    if (deleted.deletedCount === 0) {
      req.flash("error", "Artikel tidak ditemukan");
    } else {
      req.flash("msg", "Artikel berhasil dihapus");
    }

    res.redirect("/editor/articles");
  } catch (error) {
    console.error(error);
    res.status(500).send("Gagal Menghapus artikel");
  }
};
