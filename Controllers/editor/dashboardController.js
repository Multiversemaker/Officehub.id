exports.homePage = async (req, res) => {
  res.render("editor/pages/dashboard", {
    layout: "editor/layouts/main-layout",
    title: "Workspace Office Sheets",
    nama: req.session.nama,
  });
};
