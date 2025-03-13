import React from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getCurrencySymbol } from "../utils/helpers";

const countries = [
  { name: "USA", currency: "USD", flagUrl: "https://flagcdn.com/us.svg" },
  { name: "Sri Lanka", currency: "LKR", flagUrl: "https://flagcdn.com/lk.svg" },
  { name: "Australia", currency: "AUD", flagUrl: "https://flagcdn.com/au.svg" },
  { name: "India", currency: "INR", flagUrl: "https://flagcdn.com/in.svg" },
];

export default function ConversionCard({
  fromCountry,
  toCountry,
  setFromCountry,
  setToCountry,
  amount,
  setAmount,
  handleTransfer,
  loading,
  error,
  convertedAmount,
  fromCurrencyObj,
  toCurrencyObj,
  toggleHistory,
  showHistory,
}) {
  const exchangeRate =
    amount && !isNaN(amount) && convertedAmount !== null
      ? convertedAmount / parseFloat(amount)
      : null;

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        position: "relative",
        width: "100%",
      }}
      elevation={3}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "5px",
          width: "100%",
          backgroundColor: "orange",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="From:"
          select
          value={fromCountry}
          onChange={(e) => setFromCountry(e.target.value)}
          fullWidth
        >
          {countries.map((option) => (
            <MenuItem key={option.currency} value={option.currency}>
              <img
                src={option.flagUrl}
                alt={`${option.name} flag`}
                style={{ width: 24, marginRight: 8 }}
              />
              {option.currency}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="To:"
          select
          value={toCountry}
          onChange={(e) => setToCountry(e.target.value)}
          fullWidth
        >
          {countries.map((option) => (
            <MenuItem key={option.currency} value={option.currency}>
              <img
                src={option.flagUrl}
                alt={`${option.name} flag`}
                style={{ width: 24, marginRight: 8 }}
              />
              {option.currency}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {/* Amount and Convert Button Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleTransfer}
          disabled={loading}
          sx={{
            minWidth: "120px",
            height: "55px",
            borderRadius: "24px",
            backgroundColor: "#E0E0E0",
            color: "#000",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#cfcfcf" },
          }}
        >
          {loading ? (
            <MonetizationOnIcon sx={{ animation: "spin 1s linear infinite" }} />
          ) : (
            "Convert"
          )}
        </Button>
      </Box>
      {/* Conversion Result Row */}
      {exchangeRate !== null && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#a6a6a6" }}>
            1 {fromCurrencyObj?.currency} →{" "}
            {getCurrencySymbol(toCurrencyObj?.currency)}
            {exchangeRate.toFixed(2)} {toCurrencyObj?.currency}
          </Typography>
          <Button
            variant="contained"
            onClick={toggleHistory}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#E0E0E0",
              height: "40px",
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#cfcfcf" },
            }}
            endIcon={
              showHistory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            {showHistory
              ? "Hide Transaction History"
              : "Show Transaction History"}
          </Button>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {/* history details */}
      {convertedAmount !== null && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#000" }}>
            {getCurrencySymbol(fromCurrencyObj?.currency)}
            {amount} {fromCurrencyObj?.currency} →{" "}
            {getCurrencySymbol(toCurrencyObj?.currency)}
            {convertedAmount.toFixed(2)} {toCurrencyObj?.currency}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Mid-market exchange rate at {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
