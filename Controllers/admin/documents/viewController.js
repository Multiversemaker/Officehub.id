const Document = require("../../../Models/document");
const Folder = require("../../../Models/folder");
const { getColorByType } = require("../../../Utils/colorHelper");
const path = require("path");

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find()
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const recentDocs = docs.slice(0, 5);
    const folders = await Folder.find().sort({ nama: 1 });

    const documentsWithExt = docs.map((doc) => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("admin/pages/documents", {
      layout: "admin/layouts/document/document-layout",
      title: "Dokumen",
      documents: documentsWithExt,
      folders,
      recentDocs,
      view: "grid",
      req,
      getColorByType,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dokumen.");
    res.redirect("/admin/documents");
  }
};

exports.getDocumentsByFolder = async (req, res) => {
  try {
    const documents = await Document.find({ folder: req.params.folderId })
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const folders = await Folder.find().sort({ nama: 1 });

    const documentsWithExt = documents.map((doc) => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("admin/pages/documents", {
      layout: "admin/layouts/document/document-layout",
      title: "Dokumen Folder",
      documents: documentsWithExt,
      folders,
      view: "grid",
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dokumen folder.");
    res.redirect("/admin/documents");
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    req.flash("success", "Dokumen berhasil dihapus");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus dokumen");
    res.redirect("/admin/documents");
  }
};
