const User = require("../../Models/user");
exports.profilePage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("employee/pages/profile", {
    layout: "employee/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};

exports.getEditProfile = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("employee/pages/profile/editProfile", {
    layout: "employee/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};

exports.updateProfileEmployee = async (req, res) => {
  try {
    const allowedRoles = ["employee", "editor", "manager"];

    const oldUser = req.body.oldUser;
    const role = req.body.role;
    const departement = req.body.departement;

    if (!allowedRoles.includes(role)) {
      req.flash("error", "Role tidak valid");
      return res.redirect("back");
    }

    const updateUser = {
      nama: req.body.nama,
      email: req.body.email,
      role: role,
    };

    if (role === "employee" || role === "editor") {
      if (!departement || departement.trim() === "") {
        req.flash("error", "Departemen harus diisi untuk role ini.");
        return res.redirect("back");
      }
      updateUser.departement = departement;
    }

    if (role === "manager") {
      updateUser.departement = undefined;
    }

    await User.updateOne({ nama: oldUser }, { $set: updateUser });

    res.redirect("/employee/profile");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal mengupdate user");
    return res.redirect("back");
  }
};