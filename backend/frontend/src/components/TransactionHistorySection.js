import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TransactionHistorySection({
  transfers,
  handleOpenDeleteModal,
}) {
  return (
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
                {transfer.toCurrency} {transfer.convertedAmount.toFixed(2)}
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
            <IconButton onClick={() => handleOpenDeleteModal(transfer._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No transactions yet.</Typography>
      )}
    </Paper>
  );
}
