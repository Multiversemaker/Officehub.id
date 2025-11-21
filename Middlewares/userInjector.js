const User = require("../Models/user");

const userInjector = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        const userData = {
          nama: user.nama,
          email: user.email,
          role: user.role,
          departemen: user.departement,
          photo: user.photo
        };

        req.session.user = userData;
        res.locals.currentUser = userData;
      }
    } catch (err) {
      console.error("Middleware userInjector error:", err);
    }
  } else {
    req.session.user = null;
    res.locals.currentUser = null;
  }

  next();
};

module.exports = userInjector;
