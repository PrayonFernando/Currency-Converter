const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema({
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", TransferSchema);
