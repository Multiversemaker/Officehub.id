const { Dropbox } = require("dropbox");
const fs = require("fs");
const path = require("path");
const Document = require("../../../Models/document");
const { getColorByType } = require("../../../Utils/colorHelper");
const { getTypeFromExtension } = require("../../../Utils/extension");
const { getDropboxAccessToken } = require("../../../Utils/dropboxHelper");

exports.uploadDocumentManager = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }

    const uploadedFile = req.file;
    if (!uploadedFile) {
      req.flash("error", "Tidak ada file yang diunggah.");
      return res.redirect("/manager/documents");
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

    if (req.body.folderId) {
      const targetFolder = await Folder.findById(req.body.folderId);

      if (!targetFolder) {
        req.flash("error", "Folder tidak ditemukan.");
        return res.redirect("/manager/documents");
      }

      if (targetFolder.createdByRole === "employee") {
        req.flash("error", "Tidak boleh upload ke folder pegawai.");
        return res.redirect("/manager/documents");
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
        visibility: req.body.visibility || "private",
        folder: req.body.folderId || null,
      });

      req.flash("success", "Dokumen berhasil diunggah ke Dropbox dan lokal!");
      res.redirect("/manager/documents");
    } catch (dropboxErr) {
      console.error("Gagal upload ke Dropbox:", dropboxErr);
      req.flash("error", "Upload ke Dropbox gagal, tapi file tersimpan lokal.");
      res.redirect("/manager/documents");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal upload dokumen.");
    res.redirect("/manager/documents");
  }
};
