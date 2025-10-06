const User = require("../../Models/user");
exports.profilePage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("employee/pages/profile", {
    layout: "employee/layouts/profile",
    currentUser: user,
    title: "Profile",
  });
};
