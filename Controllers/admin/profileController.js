const User = require("../../Models/user");
exports.profilePage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("admin/pages/profile", {
    layout: "admin/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};
