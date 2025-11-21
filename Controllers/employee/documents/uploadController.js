const { Dropbox } = require("dropbox");
const fs = require("fs");
const path = require("path");
const Document = require("../../../Models/document");
const Folder = require("../../../Models/folder");
const { getColorByType } = require("../../../Utils/colorHelper");
const { getTypeFromExtension } = require("../../../Utils/extension");
const { getDropboxAccessToken } = require("../../../Utils/dropboxHelper");

exports.uploadDocumentEmployee = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }

    const uploadedFile = req.file;
    if (!uploadedFile) {
      req.flash("error", "Tidak ada file yang diunggah.");
      return res.redirect("/employee/documents/file");
    }

    const ext = path
      .extname(uploadedFile.originalname)
      .replace(".", "")
      .toLowerCase();
    const judul = path.basename(
      uploadedFile.originalname,
      path.extname(uploadedFile.originalname)
    );
    const type = getTypeFromExtension(ext);
    const color = getColorByType(type);

    const fileUrl = "/Public/uploads/documents/" + uploadedFile.filename;

    let folderId = req.body.folderId || null;

    if (folderId) {
      const folder = await Folder.findOne({
        _id: folderId,
        createdBy: req.session.userId,
      });

      if (!folder) {
        req.flash(
          "error",
          "Anda tidak memiliki akses ke folder ini atau folder tidak ditemukan."
        );
        return res.redirect("/employee/documents/file");
      }
    }

    try {
      const accessToken = await getDropboxAccessToken();
      const dbx = new Dropbox({ accessToken });
      const fileContent = fs.readFileSync(uploadedFile.path);
      const dropboxPath = `/documents/${uploadedFile.filename}`;

      await dbx.filesUpload({
        path: dropboxPath,
        contents: fileContent,
        mode: "overwrite",
      });

      console.log("Upload ke Dropbox berhasil:", dropboxPath);

      await Document.create({
        judul,
        type,
        color,
        fileUrl,
        filePathDropbox: dropboxPath,
        uploadedBy: req.session.userId,
        folder: folderId,
      });

      req.flash("success", "Dokumen berhasil diunggah ke Dropbox dan lokal!");
      res.redirect("/employee/documents/file");
    } catch (dropboxErr) {
      console.error("Gagal upload ke Dropbox:", dropboxErr);
      req.flash("error", "Upload ke Dropbox gagal, tapi file tersimpan lokal.");
      res.redirect("/employee/documents/file");
    }
  } catch (err) {
    console.error("Gagal upload dokumen:", err);
    req.flash("error", "Terjadi kesalahan saat upload dokumen.");
    res.redirect("/employee/documents/file");
  }
};
