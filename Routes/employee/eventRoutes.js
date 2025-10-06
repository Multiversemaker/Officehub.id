const express = require("express");
const router = express.Router();

const {
  getAllEventsEmployee,
  getEventDetailsEmployee,
} = require("../../Controllers/employee/eventController");

router.get("/events", getAllEventsEmployee);
router.get("/events/:tema", getEventDetailsEmployee);

module.exports = router;