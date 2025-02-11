import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import Nav from "../nav";
import { apiClient } from "../../lib/api-client";
import { ALL_PARKINGS } from "../../utils/constants";
import bgImage from "/bgImg.jpg";

const Parkings = () => {
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await apiClient.get(ALL_PARKINGS);
        setParkingSpots(response.data);
      } catch (error) {
        setError("Failed to fetch parking spots.");
      } finally {
        setLoading(false);
      }
    };
    fetchParkingSpots();
  }, []);

  const handleSelectParking = (parking) => {
    navigate("/book", { state: { parkingId: parking.id, parkingName: parking.name } });
  };

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
        <Typography variant="h3" fontWeight="bold" textAlign="center" color="white" mb={4}>
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
          <Grid container spacing={3} justifyContent="center">
            {parkingSpots.map((parking) => (
              <Grid item xs={12} sm={6} md={4} key={parking.id}>
                <Card sx={{ boxShadow: 5, borderRadius: 4 }}>
                  <CardMedia component="img" height="200" image={parking.imageUrl} alt={parking.name} />
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">{parking.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {parking.description}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handleSelectParking(parking)}
                    >
                      Book This Parking
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Parkings;
