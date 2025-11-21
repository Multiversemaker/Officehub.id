const Folder = require("../../../Models/folder");

exports.getFoldersAdmin = async (req, res) => {
  try {
    const folders = await Folder.find()
      .populate("createdBy", "nama departement")
      .sort({ nama: 1 })
      .lean();

    const mainFolders = folders.filter((f) => !f.parent);
    const subFolders = folders.filter((f) => f.parent);

    res.render("admin/pages/documents/folder", {
      layout: "admin/layouts/document/document-layout",
      title: "Folder",
      folders: mainFolders,
      subFolders,
      documents: [],
      view: "grid",
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat folder");
    res.redirect("/admin/dashboard");
  }
};