import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const RescheduleDialog = ({ open, onClose, onConfirm, newEndTime, setNewEndTime }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reschedule Booking</DialogTitle>
      <DialogContent>
        <TextField
          label="New End Time"
          type="time"
          fullWidth
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
          sx={{ mt: 2 }}
          InputLabel={{ shrink: true }}
          slotProps={{ step: 300 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RescheduleDialog;
