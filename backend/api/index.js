const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("../routes/transfers"); // ✅ Load API routes
const app = express();

// ✅ Fix CORS
app.use(
  cors({
    origin: "*", // Allow all origins temporarily
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ✅ Set API Routes
app.use("/api/transfers", transfersRouter);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Export Express App for Vercel
module.exports = app;
