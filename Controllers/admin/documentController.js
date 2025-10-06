const { getFilesOnly } = require("./documents/fileController");
const {
  getFoldersOnly,
  createFolder,
  renameFolder,
  deleteFolder,
} = require("./documents/folderController");
const { editTxtView, updateTxt } = require("./documents/txtController");
const { uploadDocument } = require("./documents/uploadController");
const {
  getDocuments,
  getDocumentsByFolder,
  deleteDocument,
} = require("./documents/viewController");
const {
  downloadDocument,
  viewDocumentOnline,
  openWithOffice,
} = require("./documents/viewFileExtendedController");

module.exports = {
  getFilesOnly,
  getFoldersOnly,
  createFolder,
  renameFolder,
  deleteFolder,
  editTxtView,
  updateTxt,
  uploadDocument,
  getDocuments,
  getDocumentsByFolder,
  deleteDocument,
  downloadDocument,
  viewDocumentOnline,
  openWithOffice,
};