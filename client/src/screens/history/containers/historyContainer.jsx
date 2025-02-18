import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import BookingCard from "../component/bookingCard";
import bgImage from "/bgImg.jpg";
import Nav from "../../nav";
import { useAppStore } from "../../../store";
import { fetchBookingHistory } from "../api";
import { BACKGROUND_THEME } from "../../../utils/constants";

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

        const filteredBookings =
          userInfo.role === "ADMIN"
            ? bookings
            : bookings.filter((booking) => booking.user.id === userInfo.id);

        setBookings(filteredBookings);
        setTotalPages(Math.ceil(totalBookings / 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [page]);

  return (
    <>
      <Nav />
      <Box
        sx={{
          p: 3,
          width: "100%",
          mx: "auto",
          // backgroundImage: `url(${bgImage})`,
          backgroundColor: `${BACKGROUND_THEME}`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#fff" }}
        >
          🚗 Your History
        </Typography>
        {loading ? (
          <CircularProgress />
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

        {/* Center the pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(e, value) => setPage(value - 1)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white", // Unselected page numbers will be white
                },
                "& .Mui-selected": {
                  backgroundColor: "primary.main", // Selected page remains primary
                  color: "white", // Selected text stays white
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Light hover effect
                },
              }}
            />
          </Box>
      </Box>
    </>
  );
};

export default History;
