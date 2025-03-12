const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("../routes/transfers");
const app = express();

// ✅ Fix CORS (Allow all origins temporarily for debugging)
app.use(cors());
app.options("*", cors()); // Handle preflight requests

app.use(express.json());
app.use("/api/transfers", transfersRouter);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Export the Express App (Required for Vercel)
module.exports = app;
