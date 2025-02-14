import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert, Pagination } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import bgImage from "/bgImg.jpg";
import { useAppStore } from "../../../store";
import Nav from "../../nav";
import BookingCard from "./bookingCard";
import { fetchBookingHistory } from "../api";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAppStore();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const { bookings, totalBookings } = await fetchBookingHistory(page);

        console.log("This is the bookings" , totalBookings);

        // Ensure only admins see all bookings, users see only their own
        const filteredBookings =
          userInfo.role === "ADMIN"
            ? bookings
            : bookings.filter((booking) => booking.user.id === userInfo.id);

        setBookings(filteredBookings);
        setTotalPages(Math.ceil(totalBookings / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [page, userInfo.id]); // Added userInfo.id to dependency to refetch if user changes

  return (
    <>
      <Nav />
      <Box sx={{ p: 3, width: "100%", mx: "auto", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#fff" }}>
          🚗 Your Booking History
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : bookings.length === 0 ? (
          <Alert severity="info">No bookings found.</Alert>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {bookings.map((booking) => (
              <Grid2 item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} />
              </Grid2>
            ))}
          </Grid2>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination count={totalPages} page={page + 1} onChange={(e, value) => setPage(value - 1)} color="primary" shape="rounded" />
        </Box>
      </Box>
    </>
  );
};

export default History;
