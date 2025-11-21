const deleteFolderRecursive = require("../../../Utils/deleteFolderRecursive");
const getFolderLevel = require("../../../Utils/getFolderLevel");
const Folder = require("../../../Models/folder");
exports.createFolderAdmin = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }
    const { nama, parent } = req.body;
    const level = await getFolderLevel(Folder, parent);

    if (level > 5) {
      req.flash("error", "Subfolder hanya boleh sampai 5 level");
      return res.redirect("/admin/documents");
    }

    await Folder.create({
      nama,
      parent: parent || null,
      level,
      createdBy: req.session.userId,
    });
    req.flash("success", "Folder berhasil dibuat");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuat folder");
    res.redirect("/admin/documents");
  }
};

exports.renameFolderAdmin = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      req.flash("error", "Folder tidak ditemukan");
      return res.redirect("/admin/documents");
    }
    await Folder.updateOne(
      { _id: req.params.id },
      { $set: { nama: req.body.namaBaru } }
    );
    req.flash("success", "Folder berhasil diubah");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal mengganti nama folder");
    res.redirect("/admin/documents");
  }
};

exports.deleteFolderAdmin = async (req, res) => {
  try {
    await deleteFolderRecursive(req.params.id);
    req.flash("success", "Folder dan semua dokumennya telah dihapus");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus folder");
    res.redirect("/admin/documents");
  }
};