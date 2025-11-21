const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  ringkasan: {
    type: String,
    required: true,
  },
  informasi: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;