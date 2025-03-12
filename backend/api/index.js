const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("../routes/transfers");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/transfers", transfersRouter);

// Connect to MongoDB (only when running on Vercel)
if (!process.env.VERCEL) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));
}

module.exports = app; // Export Express app for Vercel
