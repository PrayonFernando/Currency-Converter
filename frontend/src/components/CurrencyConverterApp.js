import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderSection from "./HeaderSection";
import ConversionCard from "./ConversionCard";
import TransactionHistorySection from "./TransactionHistorySection";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import {
  getCurrencySymbol,
  getCurrencyName,
  numberToWords,
} from "../utils/helpers";
import { createTransfer, fetchTransfers, deleteTransfer } from "../utils/api";

const theme = createTheme({
  typography: {
    fontFamily: "Whyte Inktrap, sans-serif",
  },
});

const countries = [
  { name: "USA", currency: "USD", flagUrl: "https://flagcdn.com/us.svg" },
  { name: "Sri Lanka", currency: "LKR", flagUrl: "https://flagcdn.com/lk.svg" },
  { name: "Australia", currency: "AUD", flagUrl: "https://flagcdn.com/au.svg" },
  { name: "India", currency: "INR", flagUrl: "https://flagcdn.com/in.svg" },
];

export default function CurrencyConverterApp() {
  const [fromCountry, setFromCountry] = useState("USD");
  const [toCountry, setToCountry] = useState("LKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    try {
      const data = await fetchTransfers();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

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
      const data = await createTransfer(payload);
      if (data) {
        setConvertedAmount(data.convertedAmount);
        await loadTransfers();
      } else {
        setError("Transfer failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTransfer(deleteId);
      await loadTransfers();
    } catch (err) {
      console.error("Error deleting transfer:", err);
    } finally {
      setDeleteId(null);
      setDeleteModalOpen(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const fromCurrencyObj = countries.find((c) => c.currency === fromCountry);
  const toCurrencyObj = countries.find((c) => c.currency === toCountry);
  const exchangeRate =
    amount && !isNaN(amount) && convertedAmount !== null
      ? convertedAmount / parseFloat(amount)
      : null;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
        {/* Header Section */}
        <HeaderSection
          fromCurrencyObj={fromCurrencyObj}
          toCurrencyObj={toCurrencyObj}
          amount={amount}
          convertedAmount={convertedAmount}
        />

        <Container maxWidth="md" sx={{ mt: { xs: -12, md: -16 } }}>
          {/* Conversion Card */}
          <ConversionCard
            fromCountry={fromCountry}
            toCountry={toCountry}
            setFromCountry={setFromCountry}
            setToCountry={setToCountry}
            amount={amount}
            setAmount={setAmount}
            handleTransfer={handleTransfer}
            loading={loading}
            error={error}
            convertedAmount={convertedAmount}
            fromCurrencyObj={fromCurrencyObj}
            toCurrencyObj={toCurrencyObj}
            toggleHistory={toggleHistory}
            showHistory={showHistory}
          />

          {showHistory && (
            <TransactionHistorySection
              transfers={transfers}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          )}
        </Container>

        <DeleteConfirmationDialog
          deleteModalOpen={deleteModalOpen}
          handleCloseDeleteModal={handleCloseDeleteModal}
          confirmDelete={confirmDelete}
        />

        {/* Spin animation for loading icon */}
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
