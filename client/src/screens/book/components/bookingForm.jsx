import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const BookingForm = ({
  parkingId,
  setParkingId,
  parkingData,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  loadingLocation,
  locationText,
  handleBooking,
  userInfo,
}) => {
  return (
    <Card sx={{ p: 3, boxShadow: 10, borderRadius: 4, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">🚗 Confirm Your Booking</Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={3}>
          <TextField
            select
            label="Select Parking Spot"
            fullWidth
            value={parkingId}
            onChange={(e) => setParkingId(e.target.value)}
            sx={{ my: 2 }}
            disabled={!!parkingData.parkingId}
          >
            <MenuItem value={parkingId}>{parkingData.parkingName || "Select"}</MenuItem>
          </TextField>

          {userInfo.role === "ADMIN" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker label="Start Date" value={startDate} onChange={setStartDate} minDate={startDate} />
                <TimePicker label="Start Time" value={startTime} onChange={setStartTime} minutesStep={1} />
                <DatePicker label="End Date" value={endDate} onChange={setEndDate} minDate={startDate} />
              </Stack>
            </LocalizationProvider>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              {userInfo.role === "USER" && <DatePicker label="Date" value={startDate} disabled />}
              <TimePicker label="End Time" value={endTime} onChange={setEndTime} minutesStep={1} />
            </Stack>
          </LocalizationProvider>

          <Typography variant="body1" sx={{ my: 2 }}>
            {loadingLocation ? <CircularProgress size={24} color="inherit" /> : `Location: ${locationText}`}
          </Typography>

          <Button variant="contained" startIcon={<EventAvailableIcon />} onClick={handleBooking} sx={{ my: 2 }} disabled={loadingLocation}>
            {loadingLocation ? "Fetching Location..." : "Book a Slot"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
