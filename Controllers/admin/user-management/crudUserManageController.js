const User = require("../../../Models/user");
const allowedRoles = ["employee", "manager", "editor"];
const bcrypt = require("bcrypt");
exports.createUserManagement = async (req, res) => {
  const { nama, email, password, role } = req.body;

  if (!allowedRoles.includes(role)) {
    return res.status(400).send("Role tidak valid");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12); // saltRounds = 12
    const newUser = new User({ nama, email, password: hashedPassword, role });
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
    const oldUser = req.body.oldUser;
    const updateUser = {
      nama: req.body.nama,
      email: req.body.email,
      role: req.body.role,
    };
    if (!allowedRoles.includes(role)) {
      return res.status(400).send("Role tidak valid");
    }
    await User.updateOne({ nama: oldUser }, { $set: updateUser });
    res.redirect("/admin/user-managements");
  } catch (error) {
    console.error(error);
    res.status(500).send("Gagal mengupdate user");
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
