import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const BookingCard = ({ booking, onReschedule, onCancel }) => {
  return (
    <Card sx={{ mb: 2, background: "#ffffff" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Booking Number: {booking.bookingId}
        </Typography>
        <Typography variant="body2">
          📅 Start Time of your booking:{" "}
          {new Date(booking.startTime).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          📅 End Time of your booking:{" "}
          {new Date(booking.endTime).toLocaleString()}
        </Typography>
        {/* <Typography variant="body2">⏳ Duration: {Math.floor((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60))}h</Typography> */}
        <Typography variant="body2">
          ⏳ Duration of your booking:
          {` ${Math.floor(
            (new Date(booking.endTime) - new Date(booking.startTime)) /
              (1000 * 60 * 60)
          )} hr 
  ${Math.floor(
    ((new Date(booking.endTime) - new Date(booking.startTime)) %
      (1000 * 60 * 60)) /
      (1000 * 60)
  )} min`}
        </Typography>

        {/* Reschedule and Cancel Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => onReschedule(booking)}
          sx={{ mt: 2, mr: 2 }}
        >
          Reschedule
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onCancel(booking)}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
