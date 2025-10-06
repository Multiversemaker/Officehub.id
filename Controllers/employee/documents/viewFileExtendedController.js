const path = require("path");
const { exec } = require("child_process");
const Document = require("../../../Models/document");

// 🔹 Download/Open biasa
exports.downloadDocument = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    "../../../public/uploads/documents",
    filename
  );
  res.download(filePath);
};
// exports.viewDocumentOnline = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await Document.findById(id);

//     if (!doc) {
//       return res.status(404).render("errors/404", {
//         layout: "employee/layouts/document/document-layout",
//         title: "Dokumen tidak ditemukan",
//         message: "Dokumen dengan ID ini tidak tersedia.",
//       });
//     }

//     if (!doc.fileUrl) {
//       return res.status(400).render("errors/400", {
//         layout: "employee/layouts/document/document-layout",
//         title: "File tidak valid",
//         message: "Dokumen ini tidak memiliki file yang bisa ditampilkan.",
//       });
//     }

//     // pastikan Express serve folder /uploads
//     const fileUrl = `http://localhost:3000${doc.fileUrl}`;

//     // pakai file_path, bukan file_url
//     const collaboraUrl = `http://localhost:9980/loleaflet/dist/loleaflet.html?file_path=${encodeURIComponent(
//       fileUrl
//     )}`;

//     res.render("employee/pages/details/detail-document", {
//       layout: "employee/layouts/document/document-layout",
//       title: `View: ${doc.judul}`,
//       collaboraUrl,
//     });
//   } catch (err) {
//     console.error("Error saat buka dokumen online:", err.message);
//     res.status(500).render("errors/500", {
//       layout: "employee/layouts/document/document-layout",
//       title: "Server Error",
//       message: "Terjadi kesalahan saat membuka dokumen online.",
//       error: process.env.NODE_ENV === "development" ? err : null,
//     });
//   }
// };

exports.openWithOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findOne({
      _id: id,
      uploadedBy: req.session.userId,
    });
    if (!doc) return res.status(404).send("Dokumen tidak ditemukan");

    const filePath = path.join(__dirname, "../../../public", doc.fileUrl);
    exec(`start "" "${filePath}"`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membuka dokumen");
      }
      res.redirect("/employee/documents");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan server");
  }
};