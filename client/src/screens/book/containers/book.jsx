import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Grid2 from "@mui/material/Grid2";
import { toast } from "react-toastify";
import dayjs from "dayjs";


// import { bookParking, getNearestSlot } from "../../services/bookingService";
import bgImage from "/bgImg.jpg";
// import { DateTimePicker } from "@mui/x-date-pickers";
import LocationFetcher from "../components/locationFetcher";
import Nav from "../../nav";
// import { useAppStore } from "../../../store";
import { bookParking, getNearestSlot } from "../api";
import { useAppStore } from "../../../store";
import DateTimePicker from "../components/dateTimePicker";

const Book = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const parkingData = location.state || {};

  // State Variables
  const [parkingId, setParkingId] = useState(parkingData.parkingId || "");
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Handle booking submission
  const handleBooking = async () => {
    if (!parkingId || !endTime || latitude === null || longitude === null) {
      toast.warn("Please fill in all fields.", { autoClose: 1000 });
      return;
    }

    const formatToLocalDateTime = (dateTime) => dayjs(dateTime).format("YYYY-MM-DDTHH:mm:ss");

    let startTimeFormatted = formatToLocalDateTime(dayjs(startDate).hour(startTime.hour()).minute(startTime.minute()));
    let endTimeFormatted = formatToLocalDateTime(dayjs(endDate).hour(endTime.hour()).minute(endTime.minute()));

    if (dayjs(endTimeFormatted).isBefore(startTimeFormatted)) {
      toast.warn("End time must be after the start time.", { autoClose: 1000 });
      return;
    }

    try {
      const response = await bookParking({
        userId: userInfo.id,
        parkingId,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        latitude,
        longitude,
      });

      if (response.statusCode === 400) {
        toast.error(response.errorMessage);
      } else if (response.errorMessage === "No available slots!") {
        const nearestSlot = await getNearestSlot(parkingId, startTimeFormatted, endTimeFormatted);
        toast.info("The nearest available slot is at " + nearestSlot, { autoClose: 5000 });
      } else {
        toast.success("Booking successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      navigate("/home");
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", p: 4 }}>
        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 10, borderRadius: 4, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold">🚗 Confirm Your Booking</Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={3}>
                  <TextField select label="Select Parking Spot" fullWidth value={parkingId} onChange={(e) => setParkingId(e.target.value)} disabled={!!parkingData.parkingId}>
                    <MenuItem value={parkingId}>{parkingData.parkingName || "Select"}</MenuItem>
                  </TextField>
                  <DateTimePicker {...{ startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime, userRole: userInfo.role }} />
                  <LocationFetcher onLocationRetrieved={(lat, lng) => { setLatitude(lat); setLongitude(lng); }} />
                  <Button variant="contained" startIcon={<EventAvailableIcon />} onClick={handleBooking}>Book a Slot</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Book;
