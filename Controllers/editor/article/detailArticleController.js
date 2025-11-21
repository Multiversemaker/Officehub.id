const Article = require("../../../Models/article");
const { formatDate } = require("../../../Utils/dateFormatter");

exports.getArticleDetailsEditor = async (req, res) => {
  try {
    const decodedJudul = decodeURIComponent(req.params.judul);
    const article = await Article.findOne({ judul: decodedJudul });

    if (!article) return res.status(404).send("Artikel tidak ditemukan");

    function createVariedParagraphs(text) {
      let sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      let paragraphs = [];
      let currentParagraph = "";
      const getRandomLength = () =>
        Math.floor(Math.random() * (450 - 250) + 350);
      let targetLength = getRandomLength();

      sentences.forEach((sentence, index) => {
        if (
          (currentParagraph + sentence).length > targetLength &&
          currentParagraph.length > 0
        ) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = "";
          targetLength = getRandomLength();
        }
        currentParagraph += sentence + " ";
        if (index === sentences.length - 1 && currentParagraph.length > 0) {
          paragraphs.push(currentParagraph.trim());
        }
      });

      return paragraphs;
    }

    const paragraphs = createVariedParagraphs(article.informasi);
    const formattedArticle = {
      ...article.toObject(),
      tanggal: formatDate(article.tanggal),
      paragraphs,
    };

    res.render("editor/pages/details/detail-article", {
      layout: "editor/layouts/detail/detail-article-layout",
      title: "Informasi Detail",
      article: formattedArticle,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengambil artikel");
  }
};
