const User = require("../../Models/user");
const bcrypt = require("bcrypt");
// Halaman Login
exports.loginPage = (req, res) => {
  res.render("auth/pages/login", {
    layout: "auth/layouts/auth-layout",
    title: "Login",
    errorMessage: req.flash("error"),
    successMessage: req.flash("success"),
  });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Email tidak ditemukan!");
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Coba fallback: plain text check (sementara)
      if (password === user.password) {
        // Password cocok, lalu hash ulang dan update
        const hashed = await bcrypt.hash(password, 12);
        user.password = hashed;
        await user.save();
      } else {
        req.flash("error", "Password salah!");
        return res.redirect("/login");
      }
    }

    // Simpan session
    req.session.userId = user._id;
    req.session.nama = user.nama;
    req.flash("success", "Login berhasil!");

    if (user.role === "admin") {
      res.redirect("/admin/dashboard");
    } else if (user.role === "employee") {
      res.redirect("/employee/dashboard");
    } else if (user.role === "editor") {
      res.redirect("/editor/dashboard");
    } else {
      res.redirect("/manager/dashboard");
    }
  } catch (error) {
    console.error("Error during login:", error);
    req.flash("error", "Terjadi kesalahan pada server.");
    res.redirect("/login");
  }
};

// Halaman Register
exports.registerPage = (req, res) => {
  res.render("auth/pages/register", {
    layout: "auth/layouts/auth-layout",
    title: "Register",
  });
};

// Register
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  const allowedRoles = ["employee", "editor", "manager"];

  if (!allowedRoles.includes(role)) {
    req.flash("error", "Role tidak valid.");
    return res.redirect("/register");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12); // saltRounds = 12
    const newUser = new User({ nama, email, password: hashedPassword, role });
    await newUser.save();

    req.flash("success", "Pendaftaran berhasil! Silakan login.");
    res.redirect("/login");
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", "Gagal mendaftar. Silakan coba lagi.");
    res.redirect("/register");
  }
};
