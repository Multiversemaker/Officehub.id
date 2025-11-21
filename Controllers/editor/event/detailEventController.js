const Event = require("../../../Models/event");
const { formatDate } = require("../../../utils/dateFormatter");


exports.getEventDetailsEditor = async (req, res) => {
  const event = await Event.findOne({ tema: req.params.tema });
  function createVariedParagraphs(text) {
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    let paragraphs = [];
    let currentParagraph = "";

    const getRandomLength = () => Math.floor(Math.random() * (450 - 250) + 350);
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
  const paragraphs = createVariedParagraphs(event.deskripsi);
  const formattedEvent = {
    ...event.toObject(),
    tanggal: formatDate(event.tanggal),
    paragraphs,
  };
  res.render("editor/pages/details/detail-event", {
    layout: "editor/layouts/detail/detail-event-layout",
    title: "Informasi Detail",
    event: formattedEvent,
  });
};
