const User = require("../../../Models/user");
const bcrypt = require("bcrypt");

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
      if (password === user.password) {
        const hashed = await bcrypt.hash(password, 12);
        user.password = hashed;
        await user.save();
      } else {
        req.flash("error", "Password salah!");
        return res.redirect("/login");
      }
    }

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

exports.register = async (req, res) => {
  const { nama, email, password, role, departement } = req.body;
  const allowedRoles = ["employee", "editor", "manager"];

  if (!allowedRoles.includes(role)) {
    req.flash("error", "Role tidak valid.");
    return res.redirect("/register");
  }

  if ((role === "employee" || role === "editor") && !departement) {
    req.flash("error", "Departemen harus diisi untuk role ini.");
    return res.redirect("/register");
  }
  if (role === "manager") {
    req.body.departement = undefined;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      nama,
      email,
      password: hashedPassword,
      role,
      departement,
      photo: req.file ? `/uploads/documents/${req.file.filename}` : "",
    });
    await newUser.save();

    req.flash("success", "Pendaftaran berhasil! Silakan login.");
    res.redirect("/login");
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", "Gagal mendaftar. Silakan coba lagi.");
    res.redirect("/register");
  }
};
