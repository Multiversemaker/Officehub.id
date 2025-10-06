const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/workspace";

mongoose.connect(MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log(`✅ MongoDB connected at ${MONGO_URL}`);
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = mongoose;
