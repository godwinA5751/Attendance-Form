const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO_URI); // DEBUG LINE

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB error:", err.message);
  }
};

module.exports = { connectDB };