exports.homePage = async (req, res) => {
    res.render('manager/pages/dashboard', {
      layout: 'manager/layouts/main-layout',
      title: 'Workspace Office Sheets',
      nama: req.session.nama,
    });
  };