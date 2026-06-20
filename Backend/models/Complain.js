const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  name: {
    String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  complain: {
    String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complain", complainSchema);
