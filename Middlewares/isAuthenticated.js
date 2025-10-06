const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    req.flash("error", "Silakan login terlebih dahulu.");
    res.redirect("/login");
  }
};

module.exports = isAuthenticated;