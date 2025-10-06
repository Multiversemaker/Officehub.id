const { getFilesOnly } = require("./documents/fileController");
const { getFoldersOnly } = require("./documents/folderController");
const { editTxtView, updateTxt } = require("./documents/txtController");
const { uploadDocument } = require("./documents/uploadController");
const {
  getDocuments,
  getDocumentsByFolder,
  deleteDocument,
} = require("./documents/viewController");
const {
  downloadDocument,
  openWithOffice,
} = require("./documents/viewFileExtendedController");

module.exports = {
  getFilesOnly,
  getFoldersOnly,
  editTxtView,
  updateTxt,
  uploadDocument,
  getDocuments,
  getDocumentsByFolder,
  deleteDocument,
  downloadDocument,
  openWithOffice,
};
