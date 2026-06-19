const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const Attendance = require("./models/Attendance.js");
const Complain = require("./models/Complain.js");


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://attendance-form-csc.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());

// connect DB
connectDB();


// POST attendance (CREATE)
app.post("/attendance", async (req, res) => {
  try {
    const { name, id } = req.body;
    
    const idRegex = /^\d{2}\/\d{2}\/\d{2}\/\d{3,4}$/;
    if (!idRegex.test(id)) {
      return res.status(400).json({
        message: "Invalid ID format. Use format 00/00/00/000 or 00/00/00/0000"
      });
    }
  
    const existing = await Attendance.findOne({ id });
    if (existing) {
      return res.status(400).json({
        message: "ID already registered"
      });
    }

    const newRecord = await Attendance.create({ name, id });

    res.status(201).json({
      message: "Attendance saved",
      data: newRecord,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/complain", async (req, res) => {
  try {
    const { name, id, complain } = req.body;

    const idRegex = /^\d{2}\/\d{2}\/\d{2}\/\d{3,4}$/;
    if (!idRegex.test(id)) {
      return res.status(400).json({
        message: "Invalid ID format. Use format 00/00/00/000 or 00/00/00/0000"
      });
    }
    
    const newRecord = await Complain.create({ name, id, complain });

    res.status(201).json({
      message: "Complaint saved",
      data: newRecord,
    });

  } catch (err) {
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

app.get("/complain", async (req, res) => {
  try {
    const records = await Complain.find().sort({ time: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/attendance", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.json({ message: "All attendance records deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/complain", async (req, res) => {
  try {
    await Complain.deleteMany({});
    res.json({ message: "All complain records deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
