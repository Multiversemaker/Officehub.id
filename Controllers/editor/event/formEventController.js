const Event = require("../../../Models/event");
exports.getCreateEventEditor = (req, res) => {
  res.render("editor/pages/creates/create-event", {
    layout: "editor/layouts/create-update/crup-layout",
    title: "Add Event",
  });
};

exports.getEditEventEditor = async (req, res) => {
  const event = await Event.findOne({ tema: req.params.tema });
  res.render("editor/pages/edits/edit-event", {
    layout: "editor/layouts/create-update/crup-layout",
    title: "Edit Event",
    event,
  });
};