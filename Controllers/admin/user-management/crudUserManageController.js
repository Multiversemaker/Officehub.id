const User = require("../../../Models/user");
const bcrypt = require("bcrypt");
exports.createUserManagement = async (req, res) => {
  const { nama, email, role, departement, password } = req.body;
  const allowedRoles = ["employee", "editor", "manager"];
  if (!allowedRoles.includes(role)) {
    req.flash("error", "Role tidak valid.");
    return res.redirect("/register");
  }
  if ((role === "employee" || role === "editor") && !departement) {
    req.flash("error", "Departemen harus diisi untuk role ini.");
    return res.redirect("/register");
  }
  if (role === "manager") {
    req.body.departement = undefined;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      nama,
      email,
      departement,
      role,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect("/admin/user-managements");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal membuat user");
    res.redirect("/admin/user-managements/add-um");
  }
};

exports.updateUserManagement = async (req, res) => {
  try {
    const allowedRoles = ["employee", "editor", "manager"];

    const oldUser = req.body.oldUser;
    const role = req.body.role;
    const departement = req.body.departement;

    if (!allowedRoles.includes(role)) {
      req.flash("error", "Role tidak valid");
      return res.redirect("/admin/user-managements");
    }

    const updateUser = {
      nama: req.body.nama,
      email: req.body.email,
      role: role,
    };

    if (role === "employee" || role === "editor") {
      if (!departement || departement.trim() === "") {
        req.flash("error", "Departemen harus diisi untuk role ini.");
        return res.redirect("/admin/user-managements");
      }
      updateUser.departement = departement;
    }

    if (role === "manager") {
      updateUser.departement = undefined;
    }

    await User.updateOne({ nama: oldUser }, { $set: updateUser });

    res.redirect("/admin/user-managements");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal mengupdate user");
    return res.redirect("/admin/user-managements");
  }
};

exports.deleteUserManagement = async (req, res) => {
  try {
    await User.deleteOne({ nama: req.params.nama });
    res.redirect("/admin/user-managements");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal Menghapus User");
  }
};
