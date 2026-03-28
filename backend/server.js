const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/trafficDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Smart Traffic Backend Running 🚦");
});

// ================= AUTH ROUTES =================
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// ================= 🚨 ACCIDENT API =================
app.get("/api/accidents", (req, res) => {
  res.json([
    {
      location: "Guntur Bus Stand",
      severity: "Medium",
      lat: 16.3067,
      lng: 80.4365
    },
    {
      location: "Nallapadu Junction",
      severity: "High",
      lat: 16.2835,
      lng: 80.4200
    },
    {
      location: "Pedakakani",
      severity: "High",
      lat: 16.3500,
      lng: 80.5000
    },
    {
      location: "Tadepalli",
      severity: "Medium",
      lat: 16.4800,
      lng: 80.6000
    },
    {
      location: "Prakasam Barrage",
      severity: "Low",
      lat: 16.5167,
      lng: 80.6167
    },
    {
      location: "Benz Circle",
      severity: "High",
      lat: 16.5100,
      lng: 80.6500
    }
  ]);
});

// ================= SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});