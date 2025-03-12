const express = require("express");
const Transfer = require("../models/Transfer");
const { convertCurrency } = require("../utils/currencyConverter"); // Import the function
const router = express.Router();

// ✅ Handle Currency Conversion and Save Transfer
router.post("/", async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;

    // ✅ Convert currency using the utility function
    const convertedAmount = await convertCurrency(
      fromCurrency,
      toCurrency,
      amount
    );

    // ✅ Save to MongoDB
    const newTransfer = new Transfer({
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
    });

    await newTransfer.save();
    res.status(201).json(newTransfer);
  } catch (error) {
    console.error("Error during conversion:", error.message);
    res.status(500).json({ error: "Failed to convert currency" });
  }
});

module.exports = router;
