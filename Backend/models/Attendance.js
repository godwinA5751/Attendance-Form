const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  name: String,
   id: {
    type: String,
    required: true,
    unique: true, // 🔥 prevents duplicates
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
