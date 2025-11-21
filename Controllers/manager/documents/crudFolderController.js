const deleteFolderRecursive = require("../../../Utils/deleteFolderRecursive");
const getFolderLevel = require("../../../Utils/getFolderLevel");
const Folder = require("../../../Models/folder");
exports.createFolderManager = async (req, res) => {
  try {
    const { nama, parent, visibility } = req.body;

    const validVisibility = ["private", "department", "public"];
    if (!validVisibility.includes(visibility)) {
      req.flash("error", "Visibility tidak valid");
      return res.redirect("/manager/documents");
    }

    const dept = visibility === "department"
      ? req.session.user.departement
      : null;


    const level = await getFolderLevel(Folder, parent);

    if (level > 5) {
      req.flash("error", "Subfolder hanya boleh sampai 5 level");
      return res.redirect("/manager/documents");
    }
    await Folder.create({
      nama,
      parent: parent || null,
      level,
      createdBy: req.session.userId,
      department: dept,
      visibility
    });

    req.flash("success", "Folder pribadi berhasil dibuat");
    res.redirect("/manager/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal membuat folder");
    res.redirect("/manager/documents");
  }
};

exports.renameFolderManager = async (req, res) => {
  try {
    const folder = await Folder.findOne({
       _id: req.params.id, 
       createdBy: req.session.userId,
       visibility: "private"
      });

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan atau bukan milik Anda");
      return res.redirect("/manager/documents");
    }

     const userDept = req.session.user.departement;

    if (folder.createdBy.role === "employee" && folder.createdBy._id != req.session.userId) {
      req.flash("error", "Anda tidak memiliki izin untuk mengubah folder pegawai");
      return res.redirect("/manager/documents");
    }

    const canEdit =
      folder.createdBy._id.equals(req.session.userId) ||
      (folder.visibility === "department" && folder.department === userDept) ||
      folder.visibility === "public";

    if (!canEdit) {
      req.flash("error", "Anda tidak memiliki izin mengubah folder ini");
      return res.redirect("/manager/documents");
    }

    folder.nama = req.body.namaBaru;
    await folder.save();

    req.flash("success", "Nama folder berhasil diubah");
    res.redirect("/manager/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal mengganti nama folder");
    res.redirect("/manager/documents");
  }
};

exports.deleteFolderManager = async (req, res) => {
  try {
    const folder = await Folder.findOne({ 
      _id: req.params.id,
      createdBy: req.session.userId,
      visibility: "private" 
    });

    if (!folder) {
      req.flash("error", "Folder tidak ditemukan atau bukan milik Anda");
      return res.redirect("/manager/documents");
    }

      const userDept = req.session.user.departement;

    if (folder.createdBy.role === "employee" && folder.createdBy._id != req.session.userId) {
      req.flash("error", "Anda tidak memiliki izin menghapus folder pegawai");
      return res.redirect("/manager/documents");
    }

    const canDelete =
      folder.createdBy._id.equals(req.session.userId) ||
      (folder.visibility === "department" && folder.department === userDept) ||
      folder.visibility === "public";

    if (!canDelete) {
      req.flash("error", "Anda tidak memiliki izin menghapus folder ini");
      return res.redirect("/manager/documents");
    }

    await deleteFolderRecursive(Folder, Document, folder._id);

    req.flash("success", "Folder dan semua dokumen di dalamnya telah dihapus");
    res.redirect("/manager/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus folder");
    res.redirect("/manager/documents");
  }
};