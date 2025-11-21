const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  level: {
    type: Number,
    default: 1,
  },
  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Folder", folderSchema);
