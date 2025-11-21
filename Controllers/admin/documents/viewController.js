const Document = require("../../../Models/document");
const Folder = require("../../../Models/folder");
const { getColorByType } = require("../../../Utils/colorHelper");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.getDocumentsAdmin = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const recentDocs = documents.slice(0, 5);
    const folders = await Folder.find().sort({ nama: 1 });

    const documentsWithExt = documents.map((doc) => ({
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

exports.getDocumentsByFolderAdmin = async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const folder = await Folder.findById(folderId);

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan.");
      return res.redirect("/admin/documents");
    }

    const documents = await Document.find({ folder: folderId })
      .populate("folder uploadedBy")
      .sort({ createdAt: -1 });

    const folders = await Folder.find({
      parent: null,
    }).sort({ nama: 1 });

    const subFolders = await Folder.find({
      parent: folderId,
    }).sort({
      nama: 1,
    });

    const documentsWithExt = documents.map((doc) => ({
      ...doc.toObject(),
      extension: path.extname(doc.fileUrl || "").toLowerCase(),
    }));

    res.render("admin/pages/documents/detail-folder", {
      layout: "admin/layouts/document/document-layout",
      title: `${folder.nama}`,
      folder,
      documents: documentsWithExt,
      subFolders,
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