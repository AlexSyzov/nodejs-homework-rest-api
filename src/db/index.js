const mongoose = require("mongoose");

require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = new mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", (_) => {
  console.log(`Database connection successful`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", (_) => {
  console.log(`Disconnected`);
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected");
    process.exit(1);
  });
});

module.exports = db;
