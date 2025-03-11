// frontend/src/components/Converter.js
import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";

const countries = [
  { name: "USA", currency: "USD" },
  { name: "Sri Lanka", currency: "LKR" },
  { name: "Australia", currency: "AUD" },
  { name: "India", currency: "INR" },
];

const Converter = ({ onTransferCreated }) => {
  const [fromCountry, setFromCountry] = useState("USA");
  const [toCountry, setToCountry] = useState("Sri Lanka");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleTransfer = async () => {
    // Retrieve currency codes for the selected countries
    const from = countries.find((c) => c.name === fromCountry);
    const to = countries.find((c) => c.name === toCountry);

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    const payload = {
      fromCountry,
      toCountry,
      fromCurrency: from.currency,
      toCurrency: to.currency,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch("http://localhost:5000/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setConvertedAmount(data.convertedAmount);
      setError(null);
      onTransferCreated();
    } catch (err) {
      setError("Transfer failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Make a Transfer
      </Typography>
      <TextField
        select
        label="From Country"
        value={fromCountry}
        onChange={(e) => setFromCountry(e.target.value)}
        fullWidth
        margin="normal"
      >
        {countries.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="To Country"
        value={toCountry}
        onChange={(e) => setToCountry(e.target.value)}
        fullWidth
        margin="normal"
      >
        {countries.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Transfer Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      {typeof convertedAmount === "number" && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Converted Amount: {convertedAmount.toFixed(2)}
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleTransfer}
      >
        Transfer
      </Button>
    </Box>
  );
};

export default Converter;
