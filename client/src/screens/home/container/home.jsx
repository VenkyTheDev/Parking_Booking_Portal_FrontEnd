import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Tooltip,
  Avatar,
} from "@mui/material";
import bgImage from "/bgImg.jpg";
import RescheduleDialog from "../components/rescheduleDialog";
import CancelDialog from "../components/cancelDialog";
import Nav from "../../nav";
import { useAppStore } from "../../../store";
import { cancelBooking, fetchActiveBookings, rescheduleBooking } from "../api";
import BookingCard from "../components/bookingCard";
import dayjs from "dayjs";
import { HOST, BACKGROUND_THEME } from "../../../utils/constants";

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
  const minAllowedTime = dayjs().hour(7).minute(0).second(0); // 7:00 AM
  const maxAllowedTime = dayjs().hour(18).minute(30).second(0); // 6:30 PM

  // Debugging Logs (Optional - Remove in Production)

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
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundSize: "cover",
          backgroundColor: `${BACKGROUND_THEME}`,
          color: "white",
          p: 3,
        }}
      >
        {(userInfo.allowedAfter > dayjs() && isNotAdmin) && (
          <Typography variant="h6" fontWeight="bold" color="red" gutterBottom>
          You can't book till{" "}
          {new Date(userInfo.allowedAfter).toLocaleString()}
        </Typography>
        )}
        {userInfo.profilePic && (
          <Avatar
            src={`${HOST}${userInfo.profilePic}`}
            sx={{ width: 100, height: 100 , objectFit: "cover",bgcolor: "#ff7043",}}
          >
            {!userInfo.profilePic && userInfo.name?.charAt(0)}
          </Avatar>
        )}
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight="bold" color="white" gutterBottom>
            Hassle-Free Parking Just for You!
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#ffc0c0"
            gutterBottom
          >
            Welcome Back {userInfo.name}!
          </Typography>
          <Tooltip
            title={
              hasActiveBooking && isNotAdmin
                ? "Only one active booking per user"
                : userInfo.allowedAfter > dayjs() && isNotAdmin
                ? "You are blocked till " +
                  new Date(userInfo.allowedAfter).toLocaleString()
                : (dayjs().isBefore(minAllowedTime) ||
                    dayjs().isAfter(maxAllowedTime)) &&
                  isNotAdmin
                ? "You are allowed to book from 7 AM to 6:30 PM"
                : ""
            }
            arrow
          >
            <span>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/parkings")}
                disabled={
                  (hasActiveBooking && isNotAdmin) ||
                  userInfo.allwedAfter > dayjs() ||
                  ((dayjs().isBefore(minAllowedTime) ||
                    dayjs().isAfter(maxAllowedTime)) &&
                    isNotAdmin)
                }
              >
                Book a Spot
              </Button>
            </span>
          </Tooltip>
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
