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
  CircularProgress,
} from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Grid2";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Nav from "../nav";
import { useAppStore } from "../../store";
import { apiClient } from "../../lib/api-client";
import { BOOKING_ROUTE } from "../../utils/constants";
import { toast } from "react-toastify";
import bgImage from "/bgImg.jpg";

const Book = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const parkingData = location.state || {};

  // State Variables
  const [parkingId, setParkingId] = useState(parkingData.parkingId || "");
  console.log("this is the parkingId" , parkingId);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationText, setLocationText] = useState("Fetching location...");
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Automatically fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationText(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
          setLoadingLocation(false);
          toast.success("Location retrieved successfully.");
        },
        () => {
          toast.error("Could not retrieve location.");
          setLoadingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  }, []);

  // Handle booking submission
  const handleBooking = async () => {
    console.log("Booking function is being called");
  
    if (!parkingId || !endTime || latitude === "" || longitude === "") {
      toast.warn("Please fill in all fields.");
      return;
    }
  
    const formatToLocalDateTime = (dateTime) => {
      return dayjs(dateTime).format("YYYY-MM-DDTHH:mm:ss"); // Ensure correct format
    };
  
    // Format startTime and endTime correctly
    let startTimeFormatted = formatToLocalDateTime(
      dayjs().hour(startTime.hour()).minute(startTime.minute()) // Using startTime directly
    );
  
    let endTimeFormatted = formatToLocalDateTime(
      dayjs().hour(endTime.hour()).minute(endTime.minute()) // Using endTime directly
    );
  
    // Log start and end time to debug
    console.log("Start Time:", startTimeFormatted);
    console.log("End Time:", endTimeFormatted);
  
    // Ensure end time is after start time
    if (dayjs(endTimeFormatted).isBefore(startTimeFormatted)) {
      toast.warn("End time must be after the start time.");
      return;
    }
  
    try {
      const response = await apiClient.post(BOOKING_ROUTE, {
        userId: userInfo.id,
        parkingId,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        latitude,
        longitude,
      }, {
        withCredentials: true,
      });
  
      console.log("This is the response of the booking:", response);
      console.log("This is the statusCode" , response.data.statusCode);
      if (response.data.statusCode === 400) {
        toast.error(response.data.errorMessage);
      } else {
        toast.success("Booking successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error in booking:", error); // Log the error
      toast.error("Failed to book parking.");
      navigate("/home");
    }
  };
  
  
  

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: 4,
        }}
      >
        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 10, borderRadius: 4, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold">🚗 Confirm Your Booking</Typography>
                <Divider sx={{ my: 2 }} />

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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={2}>
                    <TimePicker
                      label="Select End Time"
                      value={endTime}
                      onChange={(newTime) => setEndTime(newTime)}
                      minutesStep={1}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>

                <Typography variant="body1" sx={{ my: 2 }}>
                  {loadingLocation ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Location: ${locationText}`
                  )}
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<EventAvailableIcon />}
                  onClick={handleBooking}
                  sx={{ my: 2 }}
                  disabled={loadingLocation}
                >
                  {loadingLocation ? "Fetching Location..." : "Book a Slot"}
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Book;
