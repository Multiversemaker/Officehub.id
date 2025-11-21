const Document = require("../../../Models/document");
const fs = require("fs");
const path = require("path");
const { Dropbox } = require("dropbox");
const { getDropboxAccessToken } = require("../../../Utils/dropboxHelper");
exports.deleteDocumentManager = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findOne({
      _id: id,
      uploadedBy: req.session.userId
    });

    if (!doc) {
      req.flash("error", "Dokumen tidak ditemukan atau bukan milik Anda.");
      return res.redirect("/manager/documents");
    }

    const accessToken = await getDropboxAccessToken();
    const dbx = new Dropbox({ accessToken, fetch });

    if (doc.filePathDropbox) {
      try {
        await dbx.filesDeleteV2({ path: doc.filePathDropbox });
      } catch (err) {
        console.log("Gagal hapus Dropbox:", err.message);
      }
    }

    const localFolder = path.join(__dirname, "../../../public/uploads/documents");
    if (doc.localFilename) {
      const localPath = path.join(localFolder, doc.localFilename);
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    }

    await Document.findByIdAndDelete(id);

    req.flash("success", "Dokumen berhasil dihapus.");
    res.redirect("/manager/documents");

  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus dokumen.");
    res.redirect("/manager/documents");
  }
};

exports.updateDocumentManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, folderId } = req.body;

    const managerDept = req.session.user.departement;

    const doc = await Document.findById(id).populate("createdBy");
    if (!doc) {
      req.flash("error", "Dokumen tidak ditemukan.");
      return res.redirect("/manager/documents");
    }

    const allowed =
      doc.createdBy._id.equals(req.session.userId) ||
      doc.createdBy.departement === managerDept ||
      doc.visibility === "public";

    if (!allowed) {
      req.flash("error", "Anda tidak memiliki izin mengubah dokumen ini.");
      return res.redirect("/manager/documents");
    }

    if (newName) doc.judul = newName;
    if (folderId) doc.folder = folderId;

    doc.updatedAt = new Date();
    await doc.save();

    req.flash("success", "Dokumen berhasil diperbarui.");
    res.redirect("/manager/documents");

  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memperbarui dokumen.");
    res.redirect("/manager/documents");
  }
};