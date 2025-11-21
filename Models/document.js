const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "PDF",
      "Docs",
      "PPT",
      "Note",
      "Excel",
      "PNG",
      "JPG",
      "JPEG",
      "BMP",
      "GIF",
      "Other",
    ],
    default: "Other",
  },
  localFilename: { 
    type: String, 
    default: null 
  },
  fileUrl: {
    type: String,
    required: false,
  },
  filePathDropbox: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    default: "#6c757d",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
