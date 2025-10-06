const Document = require("../../../Models/document");
const Folder = require("../../../Models/folder");
const { getColorByType } = require("../../../Utils/colorHelper");
const path = require("path");

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ uploadedBy: req.session.userId })
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const recentDocs = docs.slice(0, 5);
    const folders = await Folder.find({ createdBy: req.session.userId }).sort({
      nama: 1,
    });

    const documentsWithExt = docs.map((doc) => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("employee/pages/documents", {
      layout: "employee/layouts/document/document-layout",
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
    res.redirect("/employee/documents");
  }
};

// 📂 Dokumen dalam folder tertentu
exports.getDocumentsByFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      req.flash("error", "Folder tidak ditemukan.");
      return res.redirect("/employee/documents");
    }

    const documents = await Document.find({
      folder: folderId,
      uploadedBy: req.session.userId,
    })
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const folders = await Folder.find({ createdBy: req.session.userId }).sort({
      nama: 1,
    });

    const documentsWithExt = documents.map((doc) => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("employee/pages/documents/detail-folder", {
      layout: "employee/layouts/document/document-layout",
      title: `${folder.nama}`,
      folder, 
      documents: documentsWithExt,
      folders,
      view: "grid",
      req,
      getColorByType,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dokumen folder.");
    res.redirect("/employee/documents");
  }
};

// 🗑️ Hapus dokumen
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.deleteOne({ _id: id, uploadedBy: req.session.userId }); // hanya dokumen miliknya
    req.flash("success", "Dokumen berhasil dihapus");
    res.redirect("/employee/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus dokumen");
    res.redirect("/employee/documents");
  }
};
