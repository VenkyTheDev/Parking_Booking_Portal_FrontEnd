import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import bgImage from "/bgImg.jpg";
import RescheduleDialog from "../components/rescheduleDialog";
import CancelDialog from "../components/cancelDialog";
import Nav from "../../nav";
import { useAppStore } from "../../../store";
import { cancelBooking, fetchActiveBookings, rescheduleBooking } from "../api";
import BookingCard from "../components/bookingCard";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [newEndTime, setNewEndTime] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchActiveBookings();
        setActiveBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleRescheduleClick = (booking) => {
    setSelectedBooking(booking);
    setOpenRescheduleDialog(true);
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  const handleRescheduleConfirm = async () => {
    try {
      const newDateTime = await rescheduleBooking(
        userInfo.id,
        selectedBooking.bookingId,
        newEndTime
      );
      setActiveBookings(
        activeBookings.map((booking) =>
          booking.bookingId === selectedBooking.bookingId
            ? { ...booking, endTime: newDateTime }
            : booking
        )
      );
      setOpenRescheduleDialog(false);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelBooking(userInfo.id, selectedBooking.bookingId);
      setActiveBookings(
        activeBookings.filter(
          (booking) => booking.bookingId !== selectedBooking.bookingId
        )
      );
      setOpenCancelDialog(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Check if the user has an active booking and is not an admin
  const hasActiveBooking = activeBookings.length > 0;
  const isNotAdmin = userInfo.role !== "ADMIN";

  return (
    <>
      <Nav /> {/* backgroundImage: `url(${bgImage})` */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundSize: "cover",
          backgroundColor: "#A1E3F9",
          color: "white",
          p: 3,
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight="bold" color="beige" gutterBottom>
            Hassle-Free Parking Just for You!
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="beige" gutterBottom>
            Welcome {userInfo.name}!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/parkings")}
            disabled={hasActiveBooking && isNotAdmin} // Disable button if user has an active booking and is not admin
          >
            Book a Spot
          </Button>
        </Container>

        <Box
          sx={{
            mt: 5,
            width: "80%",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            p: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Active Bookings
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : activeBookings.length === 0 ? (
            <Alert severity="info">No active bookings.</Alert>
          ) : (
            activeBookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                onReschedule={handleRescheduleClick}
                onCancel={handleCancelClick}
              />
            ))
          )}
        </Box>
      </Box>
      <RescheduleDialog
        open={openRescheduleDialog}
        onClose={() => setOpenRescheduleDialog(false)}
        onConfirm={handleRescheduleConfirm}
        newEndTime={newEndTime}
        setNewEndTime={setNewEndTime}
      />
      <CancelDialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
};

export default Home;
