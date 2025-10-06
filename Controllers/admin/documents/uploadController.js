const path = require("path");
const Document = require("../../../Models/document");
const { getColorByType } = require("../../../Utils/colorHelper");

function getTypeFromExtension(ext) {
  switch (ext) {
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "Docs";
    case "ppt":
    case "pptx":
      return "PPT";
    case "txt":
    case "md":
      return "Note";
    case "xls":
    case "xlsx":
      return "Excel";
    default:
      return "Other";
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.session.userId) {
      req.flash("error", "Silakan login terlebih dahulu");
      return res.redirect("/login");
    }

    const uploadedFile = req.file;
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

    const fileUrl = "/uploads/documents/" + uploadedFile.filename;

    await Document.create({
      judul,
      type,
      color,
      fileUrl,
      uploadedBy: req.body.userId || req.session.userId,
      // 🔹 kalau admin pilih employee, file milik employee tsb
      // 🔹 kalau kosong, otomatis milik admin sendiri
      folder: req.body.folderId || null,
    });

    req.flash("success", "Dokumen berhasil diunggah!");
    res.redirect("/admin/documents");
  } catch (err) {
    console.error(err);
    req.flash("error", "Gagal upload dokumen.");
    res.redirect("/admin/documents");
  }
};
