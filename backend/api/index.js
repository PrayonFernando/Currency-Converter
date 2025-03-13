const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Ensure environment variables are loaded

const transfersRouter = require("../routes/transfers");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/transfers", transfersRouter);

// ✅ Connect to MongoDB (Ensure MONGO_URI is correctly set in Vercel)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); // Force crash if MongoDB fails
  });

// ✅ Export Express App for Vercel
module.exports = app;
