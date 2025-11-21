const Event = require("../../Models/event");
const { formatDate } = require("../../utils/dateFormatter");

exports.getAllEventsEmployee = async (req, res) => {
  try {
    const { startDate, endDate, nama, page = 1 } = req.query;
    let query = {};

    const start =
      startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : null;
    const end = endDate && !isNaN(new Date(endDate)) ? new Date(endDate) : null;

    if (end) {
      end.setHours(23, 59, 59, 999);
    }

    if (start && end) {
      query.tanggal = { $gte: start, $lte: end };
    } else if (start) {
      query.tanggal = { $gte: start };
    } else if (end) {
      query.tanggal = { $lte: end };
    }

    if (nama && nama !== "semua") {
      query.nama = nama;
    }

    const itemsPerPage = 6;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    const totalItems = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const events = await Event.find(query)
      .sort({ tanggal: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    const eventsPerPage = events.map((event) => ({
      ...event.toObject(),
      tanggal: formatDate(event.tanggal),
    }));

    if ((startDate || endDate || nama) && eventsPerPage.length === 0) {
      req.flash(
        "warning",
        "Tidak ada event yang ditemukan dengan filter tersebut."
      );
    }

    res.render("employee/pages/event", {
      layout: "employee/layouts/editorial/event-layout",
      title: "Event",
      eventsPerPage,
      currentPage,
      totalPages,
      startDate,
      endDate,
      selectedEvent: nama || "semua",
      noEventsFound: (startDate || endDate) && eventsPerPage.length === 0,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error fetching events");
  }
};

exports.getEventDetailsEmployee = async (req, res) => {
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
  res.render("employee/pages/details/detail-event", {
    layout: "employee/layouts/detail/detail-event-layout",
    title: "Informasi Detail",
    event: formattedEvent,
  });
};
