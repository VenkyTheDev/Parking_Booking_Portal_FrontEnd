import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const FlagDialog = ({ open, flagDays, setFlagDays, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Number of Days to Flag</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          type="number"
          value={flagDays}
          onChange={(e) => setFlagDays(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlagDialog;
