// frontend/src/components/Converter.js
import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const countries = [
  { name: "USA", currency: "USD", flagUrl: "https://flagcdn.com/us.svg" },
  { name: "Sri Lanka", currency: "LKR", flagUrl: "https://flagcdn.com/lk.svg" },
  { name: "Australia", currency: "AUD", flagUrl: "https://flagcdn.com/au.svg" },
  { name: "India", currency: "INR", flagUrl: "https://flagcdn.com/in.svg" },
];

const Converter = ({ onTransferCreated }) => {
  const [fromCountry, setFromCountry] = useState("USA");
  const [toCountry, setToCountry] = useState("Sri Lanka");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    const from = countries.find((c) => c.name === fromCountry);
    const to = countries.find((c) => c.name === toCountry);

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
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
            <img
              src={option.flagUrl}
              alt={`${option.name} flag`}
              style={{ width: 24, marginRight: 8 }}
            />
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        // sx={{ borderRadius: "2rem" }}
        select
        label="To Country"
        value={toCountry}
        onChange={(e) => setToCountry(e.target.value)}
        fullWidth
        margin="normal"
      >
        {countries.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            <img
              src={option.flagUrl}
              alt={`${option.name} flag`}
              style={{ width: 24, marginRight: 8 }}
            />
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
      {convertedAmount !== null && typeof convertedAmount === "number" && (
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
        sx={{
          mt: 2,
          display: "block",
          margin: "0 auto",
          borderRadius: "2rem",
          padding: "10px 20px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
          "&:hover": {
            background: "linear-gradient(45deg, #FF8E53, #FE6B8B)",
            transform: "scale(1.05)",
          },
        }}
        onClick={handleTransfer}
        disabled={loading}
      >
        {loading ? (
          <MonetizationOnIcon
            sx={{
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          "Transfer"
        )}
      </Button>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Converter;
