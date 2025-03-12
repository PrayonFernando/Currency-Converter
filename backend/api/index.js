const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("../routes/transfers");
const app = express();

// ✅ Fix: Allow CORS for your frontend
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://frontend-sigma-flame-32.vercel.app/", // Replace with your actual deployed frontend URL
];

app.use(
  cors({
    origin: "*", // Temporarily allow all origins
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/transfers", transfersRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
