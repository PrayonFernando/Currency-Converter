const express = require("express");
const Transfer = require("../models/Transfer"); // ✅ MongoDB Model
const router = express.Router();

// ✅ GET all transfers
router.get("/", async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST a new transfer
router.post("/", async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount, convertedAmount } = req.body;
    const newTransfer = new Transfer({
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
    });
    await newTransfer.save();
    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(500).json({ error: "Failed to save transfer" });
  }
});

// ✅ DELETE a transfer
router.delete("/:id", async (req, res) => {
  try {
    await Transfer.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transfer" });
  }
});

module.exports = router;
