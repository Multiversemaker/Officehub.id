const Article = require("../../../Models/article");
const { formatDate } = require("../../../Utils/dateFormatter");

exports.getAllArticleEditor = async (req, res) => {
  try {
    const { startDate, endDate, nama, page = 1 } = req.query;
    let query = {};

    const start =
      startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : null;
    const end = endDate && !isNaN(new Date(endDate)) ? new Date(endDate) : null;

    if (end) end.setHours(23, 59, 59, 999);

    if (start && end) query.tanggal = { $gte: start, $lte: end };
    else if (start) query.tanggal = { $gte: start };
    else if (end) query.tanggal = { $lte: end };

    if (nama && nama !== "semua") query.nama = nama;

    const itemsPerPage = 6;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    const totalItems = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const articles = await Article.find(query)
      .sort({ tanggal: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    const articlesPerPage = articles.map((article) => ({
      ...article.toObject(),
      tanggal: formatDate(article.tanggal),
    }));

    if ((startDate || endDate) && articlesPerPage.length === 0) {
      req.flash("warning", "Tidak ada article yang ditemukan dengan filter tersebut.");
    }

    res.render("editor/pages/article", {
      layout: "editor/layouts/editorial/article-layout",
      title: "Article",
      articlesPerPage,
      currentPage,
      totalPages,
      startDate,
      endDate,
      selectedArticle: nama || "semua",
      noArticlesFound: (startDate || endDate) && articlesPerPage.length === 0,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Error fetching articles");
  }
};
