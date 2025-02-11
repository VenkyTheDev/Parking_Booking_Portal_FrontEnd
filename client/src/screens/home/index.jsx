import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import Nav from "../nav";
import bgImage from "/bgImg.jpg";
import { apiClient } from "../../lib/api-client";
import { GET_ACTIVE_BOOKING } from "../../utils/constants";
import { useAppStore } from "../../store";  // Assuming you have a store that holds user info.

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore(); // Get user info, assuming it includes a role (e.g. 'admin')
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveBookings = async () => {
      try {
        console.log("This is the before result");
        const result = await apiClient.get(GET_ACTIVE_BOOKING, {
          withCredentials: true,
        });
        console.log("This is the result from the home page", result);
        setActiveBookings(result.data);
      } catch (err) {
        setError("Failed to fetch active bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBookings();
  }, []);

  // Check if user has active booking and if they are not an admin
  const hasActiveBooking = activeBookings.length > 0;
  const isNotAdmin = userInfo.role !== 'admin'; // Assuming the role field holds user role.

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          mb: "0px",
          p: 3,
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Hassle-Free Parking Just for You!
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8, mb: 3 }}>
            Find, book, and manage your parking spots with ease.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              fontSize: "1.2rem",
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              backgroundColor: hasActiveBooking && isNotAdmin ? 'grey' : 'primary.main', // Set the background color conditionally
              '&:hover': {
                backgroundColor: hasActiveBooking && isNotAdmin ? 'grey' : 'primary.dark', // Hover effect
              },
            }}
            onClick={() => navigate("/parkings")}
            disabled={hasActiveBooking && isNotAdmin} // Disable button if there's an active booking and user is not admin
          >
            Book a Spot
          </Button>
        </Container>

        {/* Active Bookings Section */}
        <Box
          sx={{
            mt: 5,
            width: "80%",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            p: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Active Bookings
          </Typography>
          {loading ? (
            <CircularProgress sx={{ color: "#fff" }} />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : activeBookings.length === 0 ? (
            <Alert severity="info">No active bookings.</Alert>
          ) : (
            activeBookings.map((booking) => (
              <Card
                key={booking.bookingId}
                sx={{ mb: 2, background: "#ffffff" }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {booking.bookingId}
                  </Typography>
                  <Typography variant="body2">
                    📅 Start Time:{" "}
                    {new Date(booking.startTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    📅 End Time: {new Date(booking.endTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    ⏳ Duration:{" "}
                    {Math.floor(
                      (new Date(booking.endTime) -
                        new Date(booking.startTime)) /
                        (1000 * 60 * 60)
                    )}
                    h
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
