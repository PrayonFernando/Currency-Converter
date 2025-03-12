const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema({
  fromCurrency: String,
  toCurrency: String,
  amount: Number,
  convertedAmount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", TransferSchema);
