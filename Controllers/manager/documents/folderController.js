const Folder = require("../../../Models/folder");
const Document = require("../../../Models/document");
const getFolderLevel = require("../../../Utils/getFolderLevel");

exports.getFoldersManager = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }
    const userDept = req.session.user.departement;


    const folders = await Folder.find({
      $or: [
        { visibility: "public" },
        { visibility: "department", department: userDept },
        { createdBy: req.session.userId }
      ]
    })
      .populate("createdBy", "nama departement")
      .sort({ nama: 1 })
      .lean();

    const mainFolders = folders.filter((f) => !f.parent);
    const subFolders = folders.filter((f) => f.parent);

    res.render("manager/pages/documents/folder", {
      layout: "manager/layouts/document/document-layout",
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
    res.redirect("/manager/dashboard");
  }
};