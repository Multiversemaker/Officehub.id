const Document = require("../../../Models/document");
const fs = require("fs");
const path = require("path");
const { Dropbox } = require("dropbox");
const { getDropboxAccessToken } = require("../../../Utils/dropboxHelper");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.deleteDocumentEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findOne({
      _id: id,
      uploadedBy: req.session.userId,
    });
    if (!doc) {
      req.flash("error", "Dokumen tidak ditemukan.");
      return res.redirect("/employee/documents/file");
    }
    const accessToken = await getDropboxAccessToken();
    const dbx = new Dropbox({ accessToken, fetch });

    if (doc.filePathDropbox) {
      await dbx.filesDeleteV2({ path: doc.filePathDropbox });
      console.log("File Dropbox dihapus:", doc.filePathDropbox);
    }

    const folderPath = path.join(
      __dirname,
      "../../../public/uploads/documents"
    );

    if (doc.localFilename) {
      const localPath = path.join(folderPath, doc.localFilename);

      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
        console.log("File lokal dihapus:", localPath);
      } else {
        console.log("File lokal tidak ditemukan:", localPath);
      }
    } else {
      console.log(
        "Tidak ada nama file lokal untuk dokumen ini, lewati penghapusan file lokal."
      );
    }
    await Document.findByIdAndDelete(id);
    req.flash("success", "Dokumen berhasil dihapus");
    res.redirect("/employee/documents/file");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal menghapus dokumen");
    res.redirect("/employee/documents/file");
  }
};

exports.updateDocumentEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, folderId } = req.body;

    const doc = await Document.findOne({
      _id: id,
      createdBy: req.session.userId
    });

    if (!doc) {
      req.flash("error", "Anda tidak memiliki izin mengubah dokumen ini.");
      return res.redirect("/employee/documents/file");
    }

    if (newName) doc.judul = newName;
    if (folderId) doc.folder = folderId;

    doc.updatedAt = new Date();
    await doc.save();

    req.flash("success", "Dokumen berhasil diperbarui.");
    res.redirect("/employee/documents/file");

  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal memperbarui dokumen.");
    res.redirect("/employee/documents/file");
  }
};
