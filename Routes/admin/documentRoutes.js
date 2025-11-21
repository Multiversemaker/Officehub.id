const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const isAuthenticated = require("../../Middlewares/isAuthenticated");
const documentController = require("../../Controllers/admin/documentController");

router.get("/documents", documentController.getDocumentsAdmin);
router.get("/documents/file", documentController.getFilesAdmin);
router.get("/documents/folder", documentController.getFoldersAdmin);
router.get(
  "/documents/folder/:folderId",
  documentController.getDocumentsByFolderAdmin
);
router.post(
  "/documents",
  upload.single("file"),
  documentController.uploadDocumentAdmin
);

router.put(
  "/documents/:id",
  isAuthenticated,
  documentController.updateDocumentAdmin
);
router.delete("/documents/:id", documentController.deleteDocumentAdmin);

router.post(
  "/documents/folder",
  isAuthenticated,
  documentController.createFolderAdmin
);
router.put(
  "/documents/folder/:id/rename",
  isAuthenticated,
  documentController.renameFolderAdmin
);
router.delete(
  "/documents/folder/:nama",
  isAuthenticated,
  documentController.deleteFolderAdmin
);
router.get("/documents/:id/download", documentController.downloadDocumentAdmin);
router.get(
  "/documents/:id/view",
  isAuthenticated,
  documentController.viewDocumentOnlineAdmin
);
router.get("/documents/:id/open", documentController.openWithOfficeAdmin);

module.exports = router;
