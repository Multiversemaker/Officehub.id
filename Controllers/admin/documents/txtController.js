const fs = require("fs");
const path = require("path");
const Document = require("../../../Models/document");

exports.editTxtView = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      req.flash("error", "Dokumen tidak ditemukan.");
      return res.redirect("/admin/documents");
    }

    const ext = path.extname(doc.fileUrl).toLowerCase();
    if (ext !== ".txt" && ext !== ".md") {
      req.flash("error", "File ini tidak bisa diedit.");
      return res.redirect("/admin/documents");
    }

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    const content = fs.readFileSync(filePath, "utf-8");

    res.render("admin/pages/documents/edit-txt", {
      layout: "admin/layouts/document/document-layout",
      title: "Edit TXT",
      document: doc,
      content,
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuka file txt.");
    res.redirect("/admin/documents");
  }
};

exports.updateTxt = async (req, res) => {
  try {
    const { content } = req.body;
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      req.flash("error", "File tidak valid.");
      return res.redirect("/admin/documents");
    }

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    fs.writeFileSync(filePath, content, "utf-8");

    req.flash("success", "TXT berhasil diperbarui!");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menyimpan perubahan TXT.");
    res.redirect("/admin/documents");
  }
};
