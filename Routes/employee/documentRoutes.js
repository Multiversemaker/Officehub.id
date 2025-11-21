const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const isAuthenticated = require("../../Middlewares/isAuthenticated");
const documentController = require("../../Controllers/employee/documentController");

router.get("/documents", documentController.getDocumentsEmployee);
router.get("/documents/file", documentController.getFilesEmployee);
router.get("/documents/folder", documentController.getFoldersEmployee);
router.get(
  "/documents/folder/:folderId",
  documentController.getDocumentsByFolderEmployee
);
router.post(
  "/documents",
  upload.single("file"),
  documentController.uploadDocumentEmployee
);
router.put(
  "/documents/:id",
  isAuthenticated,
  documentController.updateDocumentEmployee
);
router.delete(
  "/documents/:id",
  isAuthenticated,
  documentController.deleteDocumentEmployee
);
router.post("/documents/folder", 
  documentController.createFolderEmployee
);
router.put(
  "/documents/folder/:id",
  isAuthenticated,
  documentController.renameFolderEmployee
);
router.delete(
  "/documents/folder/:id",
  isAuthenticated,
  documentController.deleteFolderEmployee
);
router.get(
  "/documents/:id/download",
  documentController.downloadDocumentEmployee
);
router.get(
  "/documents/:id/view",
  documentController.viewDocumentOnlineEmployee
);
router.get("/documents/:id/open", documentController.openWithOfficeEmployee);

module.exports = router;
