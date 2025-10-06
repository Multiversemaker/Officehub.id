const User = require("../../Models/user");
exports.profilePage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("editor/pages/profile", {
    layout: "editor/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};