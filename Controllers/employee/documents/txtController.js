const fs = require("fs");
const path = require("path");
const Document = require("../../../Models/document");

// 🔹 View editor untuk file txt/md
exports.editTxtView = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    // cek kepemilikan
    if (!doc || String(doc.uploadedBy) !== req.session.userId) {
      req.flash("error", "Anda tidak punya akses ke dokumen ini.");
      return res.redirect("/employee/documents");
    }

    const ext = path.extname(doc.fileUrl).toLowerCase();
    if (ext !== ".txt" && ext !== ".md") {
      req.flash("error", "File ini tidak bisa diedit.");
      return res.redirect("/employee/documents");
    }

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    const content = fs.readFileSync(filePath, "utf-8");

    res.render("employee/pages/documents/edit-txt", {
      layout: "employee/layouts/document/document-layout",
      title: "Edit TXT",
      document: doc,
      content,
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuka file txt.");
    res.redirect("/employee/documents");
  }
};

// 🔹 Simpan perubahan
exports.updateTxt = async (req, res) => {
  try {
    const { content } = req.body;
    const doc = await Document.findById(req.params.id);

    // cek kepemilikan
    if (!doc || String(doc.uploadedBy) !== req.session.userId) {
      req.flash("error", "Anda tidak punya akses ke dokumen ini.");
      return res.redirect("/employee/documents");
    }

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    fs.writeFileSync(filePath, content, "utf-8");

    req.flash("success", "TXT berhasil diperbarui!");
    res.redirect("/employee/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menyimpan perubahan TXT.");
    res.redirect("/employee/documents");
  }
};
