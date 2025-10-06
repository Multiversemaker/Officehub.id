const Folder = require("../../../Models/folder");
const Document = require("../../../Models/document");

exports.getFoldersOnly = async (req, res) => {
  const folders = await Folder.find().sort({ nama: 1 });
  res.render("admin/pages/documents/folder", {
    layout: "admin/layouts/document/document-layout",
    title: "Folder",
    folders,
    documents: [],
    view: "grid",
    req,
  });
};

exports.createFolder = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }
    await Folder.create({ nama: req.body.nama, createdBy: req.session.userId });
    req.flash("success", "Folder berhasil dibuat");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuat folder");
    res.redirect("/admin/documents");
  }
};

exports.renameFolder = async (req, res) => {
  try {
    await Folder.updateOne(
      { _id: req.params.id },
      { $set: { nama: req.body.namaBaru } }
    );
    req.flash("success", "Folder berhasil diubah");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal mengganti nama folder");
    res.redirect("/admin/documents");
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    await Document.deleteMany({ folder: req.params.id });
    await Folder.findByIdAndDelete(req.params.id);
    req.flash("success", "Folder dan semua dokumennya telah dihapus");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus folder");
    res.redirect("/admin/documents");
  }
};
