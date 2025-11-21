const deleteFolderRecursive = require("../../../Utils/deleteFolderRecursive");
const getFolderLevel = require("../../../Utils/getFolderLevel");
const Folder = require("../../../Models/folder");
exports.createFolderEmployee = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }
    const { nama, parent } = req.body;

    const level = await getFolderLevel(Folder, parent);

    if (level > 5) {
      req.flash("error", "Subfolder hanya boleh sampai 5 level");
      return res.redirect("/employee/documents");
    }
    await Folder.create({
      nama,
      parent: parent || null,
      level,
      createdBy: req.session.userId,
      visibility: "private",
    });

    req.flash("success", "Folder pribadi berhasil dibuat");
    res.redirect("/employee/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuat folder");
    res.redirect("/employee/documents");
  }
};

exports.renameFolderEmployee = async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      createdBy: req.session.userId,
      visibility: "private",
    });

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan atau bukan milik Anda");
      return res.redirect("/employee/documents");
    }

    folder.nama = req.body.namaBaru;
    await folder.save();

    req.flash("success", "Nama folder berhasil diubah");
    res.redirect("/employee/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal mengganti nama folder");
    res.redirect("/employee/documents");
  }
};

exports.deleteFolderEmployee = async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      createdBy: req.session.userId,
      visibility: "private",
    });

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan atau bukan milik Anda");
      return res.redirect("/employee/documents");
    }
    await deleteFolderRecursive(folder._id, req.session.userId);
    req.flash("success", "Folder dan semua dokumen di dalamnya telah dihapus");
    res.redirect("/employee/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus folder");
    res.redirect("/employee/documents");
  }
};