const User = require("../../../Models/user");
const { formatDate } = require("../../../Utils/dateFormatter");

exports.getAllUserManagement = async (req, res) => {
  try {
    const { startDate, endDate, nama, email, role, page = 1 } = req.query;
    let query = {};

    const start =
      startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : null;
    const end = endDate && !isNaN(new Date(endDate)) ? new Date(endDate) : null;

    if (end) end.setHours(23, 59, 59, 999);

    if (start && end) query.createdAt = { $gte: start, $lte: end };
    else if (start) query.createdAt = { $gte: start };
    else if (end) query.createdAt = { $lte: end };

    if (nama && nama.trim() !== "") {
      query.nama = { $regex: nama, $options: "i" };
    }

    if (email && email.trim() !== "") {
      query.email = { $regex: email, $options: "i" };
    }

    if (role && role !== "semua") {
      const allowedRoles = ["employee", "editor", "manager"];
      if (allowedRoles.includes(role)) {
        query.role = role;
      }
    }

    const itemsPerPage = 6;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    const totalItems = await User.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    const usersPerPage = users.map((user) => ({
      ...user.toObject(),
      createdAt: formatDate(user.createdAt),
    }));

    if (
      (startDate || endDate || nama || email || role) &&
      usersPerPage.length === 0
    ) {
      req.flash(
        "warning",
        "Tidak ada user yang ditemukan dengan filter tersebut."
      );
    }

    res.render("admin/pages/userManagement", {
      layout: "admin/layouts/um-layout",
      title: "User Management",
      usersPerPage,
      currentPage,
      totalPages,
      startDate,
      endDate,
      selectedNama: nama || "",
      selectedEmail: email || "",
      selectedRole: role || "semua",
      noUsersFound:
        (startDate || endDate || nama || email || role) &&
        usersPerPage.length === 0,
    });
  } catch (err) {
    console.error("Gagal ambil user:", err);
    res.status(500).send("Gagal Masuk");
  }
};
