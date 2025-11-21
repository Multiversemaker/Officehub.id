const User = require("../../Models/user");
exports.profilePage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("manager/pages/profile", {
    layout: "manager/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};

exports.getEditProfile = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("manager/pages/profile", {
    layout: "manager/layouts/profile/editProfile",
    currentUser: user,
    title: "Profile",
  });
};
