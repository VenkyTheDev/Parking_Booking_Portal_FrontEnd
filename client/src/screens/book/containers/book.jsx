import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { bookParkingSlot, getNearestSlot, formatToLocalDateTime } from "../api";
import BookingForm from "../components/bookingForm";
import { toast } from "react-toastify";
import bgImage from "/bgImg.jpg";
import dayjs from "dayjs";
import { useAppStore } from "../../../store";
import Nav from "../../nav";

const Book = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const parkingData = location.state || {};

  const [parkingId, setParkingId] = useState(parkingData.parkingId || "");
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationText, setLocationText] = useState("Fetching location...");
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationText(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
          setLoadingLocation(false);
          toast.dismiss();
          toast.success("Location retrieved successfully.", { autoClose: 1000 });
        },
        () => {
          toast.error("Could not retrieve location.", { autoClose: 1000 });
          setLoadingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", { autoClose: 1000 });
      setLoadingLocation(false);
    }
  }, []);

  const handleBooking = async () => {
    if (!parkingId || !endTime || latitude === null || longitude === null) {
      toast.warn("Please fill in all fields.", { autoClose: 1000 });
      return;
    }

    let startTimeFormatted = formatToLocalDateTime(startDate, startTime);
    let endTimeFormatted = formatToLocalDateTime(endDate, endTime);
    let maxAllowedTime = dayjs().set("hour", 18).set("minute", 30).set("second", 0);

    if (dayjs(endTimeFormatted).isBefore(startTimeFormatted)) {
      toast.warn("End time must be after the start time.", { autoClose: 1000 });
      return;
    }

    if (endDate.isAfter(maxAllowedTime) && userInfo.role !== "ADMIN") {
      toast.error("Booking is allowed only till 6:30 P.M", {
        position: "top-center",
        autoClose: 1000,
      });
      return; // Prevent setting an invalid endTime
    }

    try {
      const response = await bookParkingSlot(userInfo.id, parkingId, startTimeFormatted, endTimeFormatted, latitude, longitude);

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
          <Grid2 item xs={12} md={6}>
            <BookingForm
              parkingId={parkingId}
              setParkingId={setParkingId}
              parkingData={parkingData}
              startDate={startDate}
              setStartDate={setStartDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endDate={endDate}
              setEndDate={setEndDate}
              endTime={endTime}
              setEndTime={setEndTime}
              loadingLocation={loadingLocation}
              locationText={locationText}
              handleBooking={handleBooking}
              userInfo={userInfo}
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Book;
