const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const isAuthenticated = require("../../Middlewares/isAuthenticated");
const documentController = require("../../Controllers/manager/documentController");

router.get("/documents", documentController.getDocumentsManager);
router.get("/documents/file", documentController.getFilesManager);
router.get("/documents/folder", documentController.getFoldersManager);
router.get(
  "/documents/folder/:folderId",
  documentController.getDocumentsByFolderManager
);
router.post(
  "/documents",
  upload.single("file"),
  documentController.uploadDocumentManager
);
router.put(
  "/documents/:id",
  isAuthenticated,
  documentController.updateDocumentManager
);
router.delete("/documents/:id", documentController.deleteDocumentManager);

router.post(
  "/documents/folder",
  isAuthenticated,
  documentController.createFolderManager
);
router.put(
  "/documents/folder/:id/rename",
  isAuthenticated,
  documentController.renameFolderManager
);
router.delete(
  "/documents/folder/:id",
  isAuthenticated,
  documentController.deleteFolderManager
);
router.get("/documents/:id/download", documentController.downloadDocumentManager);
router.get(
  "/documents/:id/view",
  isAuthenticated,
  documentController.viewDocumentOnlineManager
);
router.get("/documents/:id/open", documentController.openWithOfficeManager);

module.exports = router;
