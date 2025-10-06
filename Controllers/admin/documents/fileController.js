const Document = require("../../../Models/document");
exports.getFilesOnly = async (req, res) => {
  try {
    const documents = await Document.find({ folder: null })
      .populate("uploadedBy")
      .sort({ createdAt: -1 });

    res.render("admin/pages/documents/file", {
      layout: "admin/layouts/document/document-layout",
      title: "File",
      documents,
      folders: [],
      view: "grid",
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat file");
    res.redirect("/admin/documents");
  }
};
