const Document = require("../../../Models/document");
exports.getFilesManager = async (req, res) => {
  try {
    const documents = await Document.find({
      uploaded: req.session.UserId,
      folder: null,
      visibility: public
    })
      .populate("uploadedBy", "nama departement")
      .populate("folder", "nama")
      .sort({ createAt: -1 });
    res.render("manager/pages/documents/file", {
      layout: "manager/layouts/document/document-layout",
      title: "File",
      documents,
      folders: [],
      view: "grid",
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error","Gagal memuat file");
    res.redirect("/manager/documents");
  }
};
