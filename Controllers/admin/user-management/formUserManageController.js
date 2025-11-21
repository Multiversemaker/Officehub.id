const User = require("../../../Models/user");

exports.getCreateUserManagement = async (req, res) => {
  try {
    res.render("admin/pages/user-managements/create-um", {
      layout: "admin/layouts/um-layout",
      title: "Add User",
    });
  } catch (err) {
    console.error("Gagal", err);
    res.status(500).send("Server error");
  }
};

exports.getEditUserManagement = async (req, res) => {
  try {
    const user = await User.findOne({ nama: req.params.nama });
    res.render("admin/pages/user-managements/update-um", {
      layout: "admin/layouts/um-layout",
      title: "Edit User",
      user,
    });
  } catch (err) {
    console.error("Gagal", err);
    res.status(500).send("Server error");
  }
};
