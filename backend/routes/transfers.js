const express = require("express");
const Transfer = require("../models/Transfer");
const { convertCurrency } = require("../utils/currencyConverter");
const router = express.Router();

// ✅ GET: Fetch all transfers
router.get("/", async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    console.error("Error fetching transfers:", error);
    res.status(500).json({ error: "Failed to fetch transfers" });
  }
});

// ✅ POST: Create new transfer
router.post("/", async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;
    const convertedAmount = await convertCurrency(
      fromCurrency,
      toCurrency,
      amount
    );
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

// ✅ DELETE: Remove a transfer
router.delete("/:id", async (req, res) => {
  try {
    const transfer = await Transfer.findByIdAndDelete(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transfer" });
  }
});

module.exports = router;
