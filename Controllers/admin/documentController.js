const { getFilesAdmin } = require("./documents/fileController");
const { getFoldersAdmin } = require("./documents/folderController");
const { uploadDocumentAdmin } = require("./documents/uploadController");
const {
  updateDocumentAdmin,
  deleteDocumentAdmin,
} = require("./documents/crudDocumentController");
const {
  createFolderAdmin,
  renameFolderAdmin,
  deleteFolderAdmin,
} = require("./documents/crudFolderController");
const {
 getDocumentsAdmin,
 getDocumentsByFolderAdmin
} = require("./documents/viewController");
const {
  downloadDocumentAdmin,
  viewDocumentOnlineAdmin,
  openWithOfficeAdmin
} = require("./documents/viewFileExtendedController");

module.exports = {
  getFilesAdmin,
  getFoldersAdmin,
  uploadDocumentAdmin,
  updateDocumentAdmin,
  deleteDocumentAdmin,
  createFolderAdmin,
  renameFolderAdmin,
  deleteFolderAdmin,
  getDocumentsAdmin,
  getDocumentsByFolderAdmin,
  downloadDocumentAdmin,
  viewDocumentOnlineAdmin,
  openWithOfficeAdmin
};
