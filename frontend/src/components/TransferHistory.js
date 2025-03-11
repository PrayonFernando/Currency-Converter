// frontend/src/components/TransferHistory.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TransferHistory = ({ transfers, onTransferDeleted }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/transfers/${selectedId}`, {
        method: "DELETE",
      });
      setOpen(false);
      setSelectedId(null);
      onTransferDeleted();
    } catch (error) {
      console.error("Error deleting transfer:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Transfer History
      </Typography>
      <List>
        {transfers.map((transfer) => (
          <ListItem
            key={transfer._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(transfer._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${transfer.fromCountry} (${transfer.fromCurrency}) -> ${transfer.toCountry} (${transfer.toCurrency})`}
              secondary={`Amount: ${
                transfer.amount
              } - Converted: ${transfer.convertedAmount.toFixed(
                2
              )} on ${new Date(transfer.date).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this transfer record?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransferHistory;
