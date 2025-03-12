import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function DeleteConfirmationDialog({
  deleteModalOpen,
  handleCloseDeleteModal,
  confirmDelete,
}) {
  return (
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
  );
}
