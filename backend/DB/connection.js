const mongoose = require("mongoose");
require("dotenv").config();
const dbURI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
