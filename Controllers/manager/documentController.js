const { getFilesManager } = require("./documents/fileController");
const { getFoldersManager } = require("./documents/folderController");
const { uploadDocumentManager } = require("./documents/uploadController");
const {
  updateDocumentManager,
  deleteDocumentManager,
} = require("./documents/crudDocumentController");
const {
  createFolderManager,
  renameFolderManager,
  deleteFolderManager,
} = require("./documents/crudFolderController");
const {
  getDocumentsManager,
  getDocumentsByFolderManager,
} = require("./documents/viewController");
const {
  downloadDocumentManager,
  viewDocumentOnlineManager,
  openWithOfficeManager,
} = require("./documents/viewFileExtendedController");

module.exports = {
    getFilesManager,
    getFoldersManager,
    uploadDocumentManager,
    updateDocumentManager,
    deleteDocumentManager,
    createFolderManager,
    renameFolderManager,
    deleteFolderManager,
    getDocumentsManager,
    getDocumentsByFolderManager,
    downloadDocumentManager,
    viewDocumentOnlineManager,
    openWithOfficeManager
}