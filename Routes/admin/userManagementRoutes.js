const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const userManagementController = require("../../Controllers/admin/userManageController");

router.get("/user-managements", userManagementController.getAllUserManagement);
router.get(
  "/user-managements/add-um",
  userManagementController.getCreateUserManagement
);
router.get(
  "/user-managements/:nama",
  userManagementController.getEditUserManagement
);
router.post(
  "/user-managements",
  upload.single("photo"),
  userManagementController.createUserManagement
);
router.put(
  "/user-managements/:nama",
  upload.single("photo"),
  userManagementController.updateUserManagement
);
router.delete(
  "/user-managements/:nama",
  userManagementController.deleteUserManagement
);

module.exports = router;
