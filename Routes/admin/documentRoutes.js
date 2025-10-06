const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const isAuthenticated = require("../../Middlewares/isAuthenticated");
const documentController = require("../../Controllers/admin/documentController");

router.get("/documents", documentController.getDocuments);
router.get("/documents/file", documentController.getFilesOnly);
router.get(
  "/documents/folder/:folderId",
  documentController.getDocumentsByFolder
);
router.post(
  "/documents",
  upload.single("file"),
  documentController.uploadDocument
);
router.get("/documents/folder", documentController.getFoldersOnly);
router.post(
  "/documents/folder",
  isAuthenticated,
  documentController.createFolder
);
router.post(
  "/documents/folder/:id/rename",
  isAuthenticated,
  documentController.renameFolder
);
router.delete(
  "/documents/folder/:id",
  isAuthenticated,
  documentController.deleteFolder
);

router.delete("/documents/:id", documentController.deleteDocument);
router.get("/documents/:id/view", isAuthenticated, documentController.viewDocumentOnline);
router.get("/documents/:id/download", documentController.downloadDocument);
router.get("/documents/:id/open", documentController.openWithOffice);

router.get(
  "/documents/:id/editTxt",
  isAuthenticated,
  documentController.editTxtView
);
router.post(
  "/documents/:id/editTxt",
  isAuthenticated,
  documentController.updateTxt
);
module.exports = router;
