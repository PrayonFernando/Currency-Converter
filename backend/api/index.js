const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transfersRouter = require("../routes/transfers");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/transfers", transfersRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  });

// Export Express App for Vercel
module.exports = app;
