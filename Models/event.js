const mongoose = require("mongoose");

const subEventSchema = new mongoose.Schema({
  deskripsi: {
    type: String,
    required: true,
  },
});

const eventSchema = new mongoose.Schema({
  tema: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  waktuMulai: {
    type: String,
    required: true,
  },
  waktuSelesai: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  subEvents: [subEventSchema],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;