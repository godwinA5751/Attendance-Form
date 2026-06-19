const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  name: String,
  id: {
    type: String,
    required: true,
    unique: true, // 🔥 prevents duplicates
  },
  complaint: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complain", complainSchema);
