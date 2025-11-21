const {
  getAllUserManagement,
} = require("../admin/user-management/listUserManageController");
const {
  getCreateUserManagement,
  getEditUserManagement,
} = require("../admin/user-management/formUserManageController");
const {
  createUserManagement,
  updateUserManagement,
  deleteUserManagement,
} = require("../admin/user-management/crudUserManageController");

module.exports = {
  getAllUserManagement,
  getCreateUserManagement,
  getEditUserManagement,
  createUserManagement,
  updateUserManagement,
  deleteUserManagement,
};
