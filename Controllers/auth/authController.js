const {login,register} = require("./system/crudAuthController");
const {redirectToLogin,loginPage,registerPage} = require("./system/formAuthController");
const {dropboxCallback,redirectToDropbox} = require("./system/dropboxController");
module.exports = {
    redirectToLogin,
    loginPage,
    login,
    registerPage,
    register,
    dropboxCallback,
    redirectToDropbox
};