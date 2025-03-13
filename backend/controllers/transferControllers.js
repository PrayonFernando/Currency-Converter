const Transfer = require("../models/Transfer");
const { convertCurrency } = require("../utils/currencyConverter");

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransfer = async (req, res) => {
  const { fromCountry, toCountry, fromCurrency, toCurrency, amount } = req.body;
  try {
    const convertedAmount = await convertCurrency(
      fromCurrency,
      toCurrency,
      amount
    );
    const transfer = new Transfer({
      fromCountry,
      toCountry,
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
    });
    const savedTransfer = await transfer.save();
    res.status(201).json(savedTransfer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findByIdAndDelete(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
