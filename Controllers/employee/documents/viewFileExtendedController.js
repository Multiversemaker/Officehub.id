const path = require("path");
const { exec } = require("child_process");
const Document = require("../../../Models/document");
const { Dropbox } = require("dropbox");
const fetch = require("node-fetch");
const { getDropboxAccessToken } = require("../../../Utils/dropboxHelper");
const fs = require("fs");

exports.downloadDocumentEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    const filename = path.basename(doc.fileUrl); 
    const filePath = path.join(
      __dirname,
      "../../../Public/uploads/documents",
      filename
    );
    res.download(filePath);
  } catch (err) {
    console.error("Error download file:", err);
    res.status(500).json({ message: "Gagal mengunduh dokumen." });
  }
};

exports.viewDocumentOnlineEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc)
      return res.status(404).json({ message: "Dokumen tidak ditemukan." });

    if (!doc.filePathDropbox)
      return res
        .status(400)
        .json({ message: "Dokumen tidak memiliki file Dropbox." });

    const accessToken = await getDropboxAccessToken();
    const dbx = new Dropbox({ accessToken, fetch });
    let sharedLink;
    try {
      const link = await dbx.sharingCreateSharedLinkWithSettings({
        path: doc.filePathDropbox,
      });
      sharedLink = link.result.url;
    } catch (err) {
      const existing = await dbx.sharingListSharedLinks({
        path: doc.filePathDropbox,
      });
      sharedLink = existing.result.links[0]?.url;
    }

    if (!sharedLink)
      return res
        .status(500)
        .json({ message: "Gagal membuat shared link Dropbox." });

    let viewUrl;
    if (doc.type === "application/pdf") {
      viewUrl = sharedLink.replace("?dl=0", "?raw=1");
    } else {
      const baseUrl = sharedLink
        .replace("?dl=0", "")
        .replace("?dl=1", "")
        .replace("?raw=1", "");

      viewUrl =
        baseUrl +
        (baseUrl.includes("?") ? "&" : "?") +
        "cloud_editor=word&dl=0";
    }

    res.status(200).json({
      message: "Dropbox viewer link berhasil dibuat.",
      document: {
        id: doc._id,
        title: doc.judul,
        type: doc.type,
        viewUrl,
      },
    });
  } catch (err) {
    console.error("Error saat preview Dropbox:", err);
    res.status(500).json({
      message: "Gagal menampilkan dokumen Dropbox.",
      error: err.message,
    });
  }
};

exports.openWithOfficeEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findOne({
      _id: id,
      uploadedBy: req.session.userId,
    });

    if (!doc) return res.status(404).send("Dokumen tidak ditemukan");

    const filePath = path.resolve(doc.fileUrl.replace(/^\//, ""));

    console.log("Full path file:", filePath);
    console.log("File exists:", fs.existsSync(filePath));

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File tidak ditemukan di server lokal.");
    }

    exec(`start "" "${filePath}"`, (err) => {
      if (err) {
        console.error("Gagal membuka dokumen:", err);
        return res.status(500).send("Gagal membuka dokumen");
      }
      res.redirect("/employee/documents");
    });
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    res.status(500).send("Terjadi kesalahan server");
  }
};