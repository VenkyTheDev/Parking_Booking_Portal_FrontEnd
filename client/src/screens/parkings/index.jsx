import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Nav from "../nav";
import { apiClient } from "../../lib/api-client";
import { ALL_PARKINGS, EDIT_PARKING, HOST } from "../../utils/constants";
import bgImage from "/bgImg.jpg";
import Grid2 from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppStore } from "../../store";

const Parkings = () => {
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await apiClient.get(ALL_PARKINGS);
        console.log("This is the response of the parkings", response);
        setParkingSpots(response.data);
      } catch (error) {
        setError("Failed to fetch parking spots.");
      } finally {
        setLoading(false);
      }
    };
    fetchParkingSpots();
  }, []);

  const handleNavigateToLocation = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleSelectParking = (parking) => {
    navigate("/book", {
      state: { parkingId: parking.id, parkingName: parking.name },
    });
  };

  const handleEditParking = (parking) => {
    console.log("This is the before navigate of the edit parking")
    navigate("/editParking", {
      state: { parkingId: parking.id, parkingName: parking.name, parkingImage: parking.parkingImage, parkingSlots: parking.highestSlots ,parkingLatitude : parking.location?.y , parkingLongitude : parking.location?.x },
    });
    console.log("This is the after navigating")
  };

  const handleAddParking = (e) => {
    navigate("/addParking");
};


console.log("This is the parking spots" , parkingSpots);

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
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

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : parkingSpots.length === 0 ? (
          <Alert severity="info">No parking spots available.</Alert>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {parkingSpots.map((parking) => (
              <Grid2 item xs={12} sm={6} md={4} key={parking.id}>
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: 320, // Set a fixed width for all cards
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  {/* Random image URL for testing, with a fixed aspect ratio */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={parking.parkingImage? `${HOST}/${parking.parkingImage}` :`https://picsum.photos/320/240?random=${parking.id}`} // Random image with fixed aspect ratio (4:3)
                    alt={parking.name}
                    sx={{
                      objectFit: "cover", // Ensures the image maintains aspect ratio
                      width: "100%", // Makes the image take up the full width of the container
                      height: {
                        xs: "150px",  // Small screens: 150px height
                        sm: "200px",  // Medium screens: 200px height
                        md: "250px",  // Larger screens: 250px height
                      },
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1, // Ensures the content grows to fill remaining space
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" noWrap>
                      {parking.name}
                    </Typography>
                    <Typography variant="h7" fontWeight="semi-bold" color="text.secondary" noWrap>
                      Total Capacity {parking.highestSlots}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Button
                        variant="contained"
                        sx={{ flexGrow: 1, borderRadius: "20px" }}
                        onClick={() => handleSelectParking(parking)}
                      >
                        Book
                      </Button>
                      {userInfo.role === "ADMIN" && (
                        <Tooltip title="Edit Parking">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditParking(parking)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="View Location on Google Maps">
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ ml: 1, minWidth: "40px", borderRadius: "50%" }}
                          onClick={() =>
                            handleNavigateToLocation(
                              parking.location?.y,
                              parking.location?.x
                            )
                          }
                        >
                          <LocationOnIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}
        {userInfo?.role === "ADMIN" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddParking}
              sx={{ borderRadius: "20px", padding: "10px 20px" }}
            >
              Add Parking
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Parkings;
