const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const Attendance = require("./models/Attendance.js");


const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://attendance-form-csc.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by HACKIX"));
    }
  },
  credentials: true
}));
app.use(express.json());

// connect DB
connectDB();


// POST attendance (CREATE)
app.post("/attendance", async (req, res) => {
  try {
    const { name, id } = req.body;

    if (!name || !id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newRecord = await Attendance.create({
      name,
      id,
    });

    res.status(201).json({
      message: "Attendance saved",
      data: newRecord,
    });

  } catch (err) {
    console.log("POST ERROR:", err); // IMPORTANT
    res.status(500).json({ message: err.message });
  }
});


// GET all attendance (READ)
app.get("/attendance", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ time: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});