const { getAllEventsEditor } = require("./event/listEventController");
const { getEventDetailsEditor } = require("./event/detailEventController");
const {
  getCreateEventEditor,
  getEditEventEditor,
} = require("./event/formEventController");
const {
  createEventEditor,
  updateEventEditor,
  deleteEventEditor,
} = require("./event/crudEventController");

module.exports = {
  getAllEventsEditor,
  getEventDetailsEditor,
  getCreateEventEditor,
  getEditEventEditor,
  createEventEditor,
  updateEventEditor,
  deleteEventEditor,
};