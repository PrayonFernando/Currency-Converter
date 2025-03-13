const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("./routes/transfers");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transfers", transfersRouter);

// ✅ Export app (Vercel auto-handles server)
module.exports = app;

// ✅ Connect to MongoDB (Vercel-compatible)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
