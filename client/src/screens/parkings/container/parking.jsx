import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Nav from "../../nav";
import ParkingCard from "../components/parkingCard";
import { useAppStore } from "../../../store";
import bgImage from "/bgImg.jpg";
import dayjs from "dayjs";
import { fetchParkingSpots } from "../api";

const Parkings = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [endTime, setEndTime] = useState(
    dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm:ss")
  );

  useEffect(() => {
    const loadParkingSpots = async () => {
      try {
        setLoading(true);
        const data = await fetchParkingSpots(endTime);
        setParkingSpots(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadParkingSpots();
  }, [endTime]);

  const handleNavigateToLocation = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleSelectParking = (parking) => {
    navigate("/book", {
      state: {
        parkingId: parking.id,
        parkingName: parking.name,
        parkingLatitude: parking.location.coordinates[1],
        parkingLongitude: parking.location.coordinates[0],
        parkingImage: parking.parkingImage,
      },
    });
  };

  const handleEditParking = (parking) => {
    navigate("/editParking", {
      state: {
        parkingId: parking.id,
        parkingName: parking.name,
        parkingImage: parking.parkingImage,
        parkingSlots: parking.highestSlots,
        parkingLatitude: parking.location.coordinates[1],
        parkingLongitude: parking.location.coordinates[0],
      },
    });
  };

  const handleAddParking = () => navigate("/addParking");

  const handleEndTimeChange = (event) => {
    const selectedHour = parseInt(event.target.value, 10);
    setSelectedHours(selectedHour);
    setEndTime(dayjs().add(selectedHour, "hour").format("YYYY-MM-DDTHH:mm:ss"));
  };

  const getAvailableHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const maxHour = 18; // 6:30 PM is 18:30 in 24-hour format
    const maxMinute = 30;

    let availableHours = [];
    for (let hour = 1; hour <= 10; hour++) {
      const endHour = currentHour + hour;
      const isValid =
        endHour < maxHour ||
        (endHour === maxHour && currentMinutes <= maxMinute);

      if (isValid) {
        availableHours.push(hour);
      } else {
        break; // Stop when exceeding 6:30 PM
      }
    }
    return availableHours;
  };

  const availableHours = getAvailableHours();

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          //   backgroundImage: `url(${bgImage})`,
          backgroundColor: "#A1E3F9",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          color="white"
          mb={4}
        >
          Select a Parking Spot
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          {availableHours.length === 0 ? (
            <Typography sx={{ mr: 1, fontWeight: "600" }}>
              Booking allowed till 6:30 PM only
            </Typography>
          ) : (
            <>
              <Typography sx={{ mr: 1, fontWeight: "600" }}>
                Get the available parking spots for the next
              </Typography>
              <select
                value={selectedHours}
                onChange={handleEndTimeChange}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  color: "#000",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {availableHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} Hour{hour > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </>
          )}
        </Box>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {parkingSpots.map((parking) => (
              <Grid2 item xs={12} sm={6} md={4} key={parking.id}>
                <ParkingCard
                  parking={parking}
                  endTime={endTime}
                  userInfo={userInfo}
                  onSelect={handleSelectParking}
                  onEdit={handleEditParking}
                  onNavigate={handleNavigateToLocation}
                />
              </Grid2>
            ))}
          </Grid2>
        )}

        {userInfo?.role === "ADMIN" && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" onClick={handleAddParking}>
              Add Parking
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Parkings;
