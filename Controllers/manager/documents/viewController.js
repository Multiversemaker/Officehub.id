const Document = require("../../../Models/document");
const Folder = require("../../../Models/folder");
const path = require("path");

exports.getDocumentsManager = async (req, res) => {
  try {
    const docs = await Document.find({
      uploadedBy: req.session.userId
    })
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const recentDocs = docs.slice(0, 5);

    const folders = await Folder.find({
      createdBy: req.session.userId
    }).sort({ nama: 1 });

    const documentsWithExt = docs.map(doc => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("manager/pages/documents", {
      layout: "manager/layouts/document/document-layout",
      title: "Dokumen Manager",
      documents: documentsWithExt,
      folders,
      recentDocs,
      view: "grid",
      req
    });

  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dokumen.");
    res.redirect("/manager/documents");
  }
};

exports.getDocumentsByFolderManager = async (req, res) => {
  try {
    const folderId = req.params.folderId;

    const folder = await Folder.findOne({
      _id: folderId,
      createdBy: req.session.userId,
    });

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan atau bukan milik Anda.");
      return res.redirect("/manager/documents");
    }

    const documents = await Document.find({
      folder: folderId,
      uploadedBy: req.session.userId
    })
    .populate("folder uploadedBy")
    .sort({ createdAt: -1 });

    const folders = await Folder.find({
      createdBy: req.session.userId,
      parent: null
    }).sort({ nama: 1 });

    const subFolders = await Folder.find({
      parent: folderId,
      createdBy: req.session.userId
    }).sort({ nama: 1 });

    const documentsWithExt = documents.map(doc => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("manager/pages/documents/detail-folder", {
      layout: "manager/layouts/document/document-layout",
      title: folder.nama,
      folder,
      documents: documentsWithExt,
      subFolders,
      folders,
      view: "grid",
      req
    });

  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat dokumen folder.");
    res.redirect("/manager/documents");
  }
};