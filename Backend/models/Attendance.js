const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  name: String,
  id: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);