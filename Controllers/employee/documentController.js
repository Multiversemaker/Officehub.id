const { getFilesEmployee } = require("./documents/fileController");
const { getFoldersEmployee } = require("./documents/folderController");
const { uploadDocumentEmployee } = require("./documents/uploadController");
const {
  updateDocumentEmployee,
  deleteDocumentEmployee,
} = require("./documents/crudDocumentController");
const {
  createFolderEmployee,
  renameFolderEmployee,
  deleteFolderEmployee,
} = require("./documents/crudFolderController");
const {
  getDocumentsEmployee,
  getDocumentsByFolderEmployee,
} = require("./documents/viewController");
const {
  downloadDocumentEmployee,
  viewDocumentOnlineEmployee,
  openWithOfficeEmployee,
} = require("./documents/viewFileExtendedController");

module.exports = {
  getFilesEmployee,
  getFoldersEmployee,
  uploadDocumentEmployee,
  updateDocumentEmployee,
  deleteDocumentEmployee,
  createFolderEmployee,
  renameFolderEmployee,
  deleteFolderEmployee,
  getDocumentsEmployee,
  getDocumentsByFolderEmployee,
  downloadDocumentEmployee,
  viewDocumentOnlineEmployee,
  openWithOfficeEmployee
};
