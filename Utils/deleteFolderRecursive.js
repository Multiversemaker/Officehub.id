const Document = require("../Models/document");
const Folder = require("../Models/folder");
async function deleteFolderRecursive(folderId) {
  const sub = await Folder.find({ parent: folderId });
  for (const s of sub) {
    await deleteFolderRecursive(s._id);
  }
  await Document.deleteMany({ folder: folderId });
  await Folder.findByIdAndDelete(folderId);
}

module.exports = deleteFolderRecursive;