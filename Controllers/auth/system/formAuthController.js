exports.redirectToLogin = (req,res) => {
    res.redirect("/login");
};

exports.loginPage = (req, res) => {
  res.render("auth/pages/login", {
    layout: "auth/layouts/auth-layout",
    title: "Login",
    errorMessage: req.flash("error"),
    successMessage: req.flash("success"),
  });
};

exports.registerPage = (req, res) => {
  res.render("auth/pages/register", {
    layout: "auth/layouts/auth-layout",
    title: "Register",
  });
};