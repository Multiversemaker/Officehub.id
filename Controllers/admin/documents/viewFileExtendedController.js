const path = require("path");
const { exec } = require("child_process");
const Document = require("../../../Models/document");
const fs = require("fs");

exports.downloadDocument = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    "../../../public/uploads/documents",
    filename
  );
  res.download(filePath);
};
exports.viewDocumentOnline = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).send("Dokumen tidak ditemukan");

    if (!doc.fileUrl) return res.status(400).send("File tidak tersedia");

    // fileUrl di model kamu, misal: "/uploads/documents/namaFile.pdf"
    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);

    const ext = path.extname(doc.fileUrl).toLowerCase();
    if (ext === ".pdf") {
      res.contentType("application/pdf");
    } else if (ext === ".docx") {
      res.contentType(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    } else if (ext === ".pptx") {
      res.contentType(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      );
    } else if ([".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(ext)) {
      res.contentType(`image/${ext.replace(".", "")}`);
    } else {
      res.contentType("application/octet-stream"); // fallback
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.openWithOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).send("Dokumen tidak ditemukan");

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    exec(`start "" "${filePath}"`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membuka dokumen");
      }
      res.redirect("/admin/documents");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan server");
  }
};
