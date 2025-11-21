exports.homePage = async (req, res) => {
  res.render("employee/pages/dashboard", {
    layout: "employee/layouts/main-layout",
    title: "Workspace Office Sheets",
    nama: req.session.nama,
  });
};
