const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const transfersRouter = require("../routes/transfers");
const app = express();

// ✅ Enable CORS for development (Allow frontend requests)
app.use(
  cors({
    origin: "*", // Change to frontend URL after testing
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Handle OPTIONS preflight requests
app.options("*", cors());

app.use(express.json());

// ✅ API Route (Must match frontend requests)
app.use("/api/transfers", transfersRouter);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// ✅ Start Local Server (Comment this when deploying to Vercel)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
