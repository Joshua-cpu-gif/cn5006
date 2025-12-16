const mongoose = require("mongoose");

const MONG_URI =
  "mongodb+srv://joshua:Joshua1234@joshua.mldcuth.mongodb.net/BooksData?appName=Joshua";

async function connectDB() {
  try {
    await mongoose.connect(MONG_URI);
    console.log(`Connection successful to ${MONG_URI}`);
    console.log(`Current mongoose version: ${mongoose.version}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
