const Event = require("../../../Models/event");
exports.createEventEditor = async (req, res) => {
  try {
    const {
      tema,
      tanggal,
      deskripsi,
      waktuMulai,
      waktuSelesai,
      lokasi,
      subEvents,
    } = req.body;

    const formattedSubEvents = Array.isArray(subEvents)
      ? subEvents.map((desc) => ({ deskripsi: desc }))
      : subEvents
      ? [{ deskripsi: subEvents }]
      : [];

    await Event.create({
      tema,
      tanggal,
      deskripsi,
      waktuMulai,
      waktuSelesai,
      lokasi,
      image: req.file ? `/uploads/documents/${req.file.filename}` : null,
      subEvents: formattedSubEvents,
    });

    res.redirect("/editor/events");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating event");
  }
};

exports.updateEventEditor = async (req, res) => {
  try {
    const eventId = req.body.id;
    const oldEvent = await Event.findById(eventId);

    if (!oldEvent) {
      return res.status(404).send("Event not found");
    }

    const updatedEvent = {
      tema: req.body.tema,
      tanggal: new Date(req.body.tanggal),
      waktuMulai: req.body.waktuMulai,
      waktuSelesai: req.body.waktuSelesai,
      lokasi: req.body.lokasi,
      deskripsi: req.body.deskripsi,
    };

    if (req.body.subEvents) {
      const subEvents = Array.isArray(req.body.subEvents)
        ? req.body.subEvents
        : JSON.parse(req.body.subEvents);

      updatedEvent.subEvents = subEvents.map((desc) => ({ deskripsi: desc }));
    }

    if (req.file) {
      updatedEvent.image = `/uploads/documents/${req.file.filename}`;
    } else {
      updatedEvent.image = oldEvent.image;
    }

    await Event.updateOne({ _id: eventId }, { $set: updatedEvent });

    req.flash("msg", "Event updated successfully");
    res.redirect("/editor/events");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating event");
  }
};

exports.deleteEventEditor = async (req, res) => {
  try {
    await Event.deleteOne({ tema: req.params.tema });
    req.flash("msg", "Event deleted successfully");
    res.redirect("/editor/events");
  } catch (error) {
    res.status(500).send("Error deleting event");
  }
};