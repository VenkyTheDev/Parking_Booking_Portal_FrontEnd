import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";

const CancelDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to cancel this booking? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onConfirm} color="error">Yes, Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
