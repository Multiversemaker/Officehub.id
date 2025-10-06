const Folder = require("../../../Models/folder");

exports.getFoldersOnly = async (req, res) => {
  const folders = await Folder.find().sort({ nama: 1 });
  res.render("employee/pages/documents/folder", {
    layout: "employee/layouts/document/document-layout",
    title: "Folder",
    folders,
    documents: [],
    view: "grid",
    req,
  });
};
