const Folder = require("../../../Models/folder");
exports.getFoldersEmployee = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }

    const folders = await Folder.find({
      createdBy: req.session.userId,
      visibility: "private",
    })
      .sort({ nama: 1 })
      .lean();

    const mainFolders = folders.filter((f) => !f.parent);
    const subFolders = folders.filter((f) => f.parent);

    res.render("employee/pages/documents/folder", {
      layout: "employee/layouts/document/document-layout",
      title: "Folder Pribadi",
      folders: mainFolders,
      subFolders,
      documents: [],
      view: "grid",
      req,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memuat folder pribadi");
    res.redirect("/employee/dashboard");
  }
};