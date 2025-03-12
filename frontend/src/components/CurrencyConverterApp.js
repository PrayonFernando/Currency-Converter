// src/components/CurrencyConverterApp.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// ---------- Helper Functions ----------

// Converts a numeric value to its word representation (rounded to the nearest integer)
function numberToWords(num) {
  if (num === 0) return "zero";
  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const g = ["", "thousand", "million", "billion"];
  const chunkToWords = (n) => {
    let str = "";
    if (n >= 100) {
      str += a[Math.floor(n / 100)] + " hundred ";
      n = n % 100;
    }
    if (n >= 20) {
      str += b[Math.floor(n / 10)];
      if (n % 10) {
        str += "-" + a[n % 10];
      }
    } else if (n > 0) {
      str += a[n];
    }
    return str.trim();
  };
  let words = "";
  let chunkIndex = 0;
  num = Math.round(num);
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      let chunkWord = chunkToWords(chunk);
      if (g[chunkIndex]) {
        chunkWord += " " + g[chunkIndex];
      }
      words = chunkWord + (words ? " " + words : "");
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }
  return words;
}

// Returns a currency symbol based on a given currency code
function getCurrencySymbol(currency) {
  switch (currency) {
    case "USD":
      return "$";
    case "LKR":
      return "Rs.";
    case "AUD":
      return "A$";
    case "INR":
      return "₹";
    default:
      return "";
  }
}

// Returns the full currency currency based on a given currency code
function getCurrencycurrency(currency) {
  switch (currency) {
    case "USD":
      return "dollars";
    case "LKR":
      return "Sri Lankan rupees";
    case "AUD":
      return "Australian dollars";
    case "INR":
      return "Indian rupees";
    default:
      return currency;
  }
}
// ---------- End Helper Functions ----------

// Example country data with flags
const countries = [
  { currency: "USA", currency: "USD", flagUrl: "https://flagcdn.com/us.svg" },
  {
    currency: "Sri Lanka",
    currency: "LKR",
    flagUrl: "https://flagcdn.com/lk.svg",
  },
  {
    currency: "Australia",
    currency: "AUD",
    flagUrl: "https://flagcdn.com/au.svg",
  },
  { currency: "India", currency: "INR", flagUrl: "https://flagcdn.com/in.svg" },
];

// Create a custom MUI theme to apply the Whyte Inktrap font
const theme = createTheme({
  typography: {
    fontFamily: "Whyte Inktrap, sans-serif",
  },
});

export default function CurrencyConverterApp() {
  // === State Variables ===
  const [fromCountry, setFromCountry] = useState("USA");
  const [toCountry, setToCountry] = useState("Sri Lanka");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // === Transaction History ===
  const [transfers, setTransfers] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // === Delete Confirmation Modal ===
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // === On Mount, Fetch Transfers ===
  useEffect(() => {
    fetchTransfers();
  }, []);

  // === Fetch Transfer History from Backend ===
  const fetchTransfers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transfers");
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  // === Handle Transfer (Convert) ===
  const handleTransfer = async () => {
    const from = countries.find((c) => c.currency === fromCountry);
    const to = countries.find((c) => c.currency === toCountry);

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }
    setLoading(true);
    setError(null);

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
      await fetchTransfers();
    } catch (err) {
      console.error(err);
      setError("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // === Open the Delete Confirmation Modal ===
  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // === Close the Delete Confirmation Modal ===
  const handleCloseDeleteModal = () => {
    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  // === Confirm Delete (API call) ===
  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/transfers/${deleteId}`, {
        method: "DELETE",
      });
      await fetchTransfers();
    } catch (err) {
      console.error("Error deleting transfer:", err);
    } finally {
      setDeleteId(null);
      setDeleteModalOpen(false);
    }
  };

  // === Toggle History Visibility ===
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Grab the currency objects for convenience
  const fromCurrencyObj = countries.find((c) => c.currency === fromCountry);
  const toCurrencyObj = countries.find((c) => c.currency === toCountry);

  const exchangeRate =
    amount && !isNaN(amount) && convertedAmount !== null
      ? convertedAmount / parseFloat(amount)
      : null;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
        {/* 1) BLACK HEADER WITH INVERTED ARC (clip-path) */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "40vh", md: "50vh" },
            backgroundColor: "#000",
            color: "#fff",
            clipPath: "ellipse(150% 100% at 50% 0%)",
            display: "flex",
            alignItems: "flex-end",
            pb: 4,
          }}
        >
          <Container
            maxWidth="md"
            sx={{ color: "White", mb: "150px", ml: "300px" }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              mb={1}
              sx={{ ml: "250px", mb: "50px" }}
            >
              Currency Converter
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
              {fromCurrencyObj?.currency} to {toCurrencyObj?.currency}{" "}
              Conversion at Real Exchange Rate
            </Typography>

            {convertedAmount !== null ? (
              <>
                <Typography variant="subtitle1" mb={1} sx={{ mt: "10px" }}>
                  {numberToWords(parseFloat(amount))}{" "}
                  {getCurrencycurrency(fromCurrencyObj?.currency)} converted to{" "}
                  {numberToWords(convertedAmount)}{" "}
                  {getCurrencycurrency(toCurrencyObj?.currency)}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" mb={1}>
                  Select currencies and enter an amount to see live conversion
                </Typography>
                <Typography variant="subtitle1">(No conversion yet)</Typography>
              </>
            )}
          </Container>
        </Box>

        {/* 2) WHITE CARD WITH ORANGE TOP BORDER */}
        <Container maxWidth="md" sx={{ mt: { xs: -12, md: -16 } }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              position: "relative",
              width: "100%",
            }}
            elevation={3}
          >
            {/* Orange border at the top */}
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

            {/* FROM & TO FIELDS (inline) */}
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
                      alt={`${option.currency} flag`}
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
                      alt={`${option.currency} flag`}
                      style={{ width: 24, marginRight: 8 }}
                    />
                    {option.currency}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* AMOUNT & CONVERT BUTTON */}
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
                  "&:hover": {
                    backgroundColor: "#cfcfcf",
                  },
                }}
              >
                {loading ? (
                  <MonetizationOnIcon
                    sx={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  "Convert"
                )}
              </Button>
            </Box>

            {exchangeRate !== null && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#000" }}
                >
                  1 {fromCurrencyObj?.currency} →{" "}
                  {getCurrencySymbol(toCurrencyObj?.currency)}
                  {exchangeRate.toFixed(2)} {toCurrencyObj?.currency}
                </Typography>
                {/* SHOW/HIDE TRANSACTION HISTORY BUTTON */}
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
                    "&:hover": {
                      backgroundColor: "#cfcfcf",
                    },
                  }}
                  endIcon={
                    showHistory ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  {showHistory
                    ? "Hide Transaction History"
                    : "Show Transaction History"}
                </Button>
              </Box>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>

          {/* TRANSACTION HISTORY SECTION */}
          {showHistory && (
            <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }} elevation={2}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Transaction History
              </Typography>
              {transfers.length > 0 ? (
                transfers.map((transfer) => (
                  <Box
                    key={transfer._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      p: 2,
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {transfer.fromCurrency} {transfer.amount} →{" "}
                        {transfer.toCurrency}{" "}
                        {transfer.convertedAmount.toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Converted Date & Time:{" "}
                        {new Date(transfer.date).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}{" "}
                        hrs
                      </Typography>
                    </Box>
                    {/* Delete icon opens the confirmation modal */}
                    <IconButton
                      onClick={() => handleOpenDeleteModal(transfer._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No transactions yet.</Typography>
              )}
            </Paper>
          )}
        </Container>

        {/* DELETE CONFIRMATION DIALOG */}
        <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this transfer record?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Spin keyframes for loading icon */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
}
