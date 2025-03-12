const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

exports.convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    // GET conversion rate from the API
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
    );
    const rate = response.data.conversion_rate;
    return amount * rate;
  } catch (error) {
    throw new Error("Currency conversion failed");
  }
};
