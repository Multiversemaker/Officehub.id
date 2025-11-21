const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "manager", "editor"],
    required: true,
  },
  departement: {
    type: String,
    enum: ["HRD", "IT", "Akuntansi", "Produksi", "Keuangan", "Penjualan"],
    required: function () {
      return this.role === "employee" || this.role === "editor";
    },
  },
  photo:{
    type: String,
    required: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;