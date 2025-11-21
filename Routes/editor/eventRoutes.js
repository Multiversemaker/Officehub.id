const express = require("express");
const router = express.Router();
const upload = require("../../Middlewares/upload");
const eventController = require("../../Controllers/editor/eventController");

router.get("/events", eventController.getAllEventsEditor);
router.get("/events/add-event", eventController.getCreateEventEditor);
router.get("/events/edit-event/:tema", eventController.getEditEventEditor);
router.get("/events/:tema", eventController.getEventDetailsEditor);

router.post(
  "/events",
  upload.single("image"),
  eventController.createEventEditor
);
router.put(
  "/events/:tema",
  upload.single("image"),
  eventController.updateEventEditor
);
router.delete("/events/:tema", eventController.deleteEventEditor);

module.exports = router;
