import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Tooltip,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Parking icon
import { HISTORY_ROUTE, HOST } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import Nav from "../nav";
import bgImage from "/bgImg.jpg";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await apiClient.get(HISTORY_ROUTE, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        const response = result.data;
        if (Array.isArray(response)) {
          setBookings(response);
        } else {
          setError("Failed to fetch booking history. Invalid response format.");
        }
      } catch (err) {
        setError("Failed to fetch booking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userInfo.id]);

  const getTimelineWidth = (startTime, endTime) => {
    const dayStart = new Date(new Date().setHours(0, 0, 0, 0)); // Start of the current day (00:00)
    const dayEnd = new Date(new Date().setHours(23, 59, 59, 999)); // End of the current day (23:59)

    const normalizedStartTime =
      new Date(startTime).getTime() - dayStart.getTime();
    const normalizedEndTime = new Date(endTime).getTime() - dayStart.getTime();
    const totalDayTime = dayEnd.getTime() - dayStart.getTime();

    return ((normalizedEndTime - normalizedStartTime) / totalDayTime) * 100;
  };

  // const getStartPosition = (startTime) => {
  //   const dayStart = new Date(new Date().setHours(0, 0, 0, 0)); // Start of the current day (00:00)
  //   const normalizedStartTime =
  //     new Date(startTime).getTime() - dayStart.getTime();
  //   const totalDayTime =
  //     new Date(new Date().setHours(23, 59, 59, 999)).getTime() -
  //     dayStart.getTime();

  //   return (normalizedStartTime / totalDayTime) * 100;
  // };

  const getStartPosition = (startTime) => {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0); // Start of the current day (00:00:00)
  
    const startDate = new Date(startTime); // Convert startTime to a valid JavaScript Date object
  
    // Check if startTime is valid
    if (isNaN(startDate.getTime())) {
      console.error("Invalid start time:", startTime);
      return 0;
    }
    const normalizedStartTime = new Date(dayStart); // Copy of the start of the day
    normalizedStartTime.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
  
    const totalDayTime = new Date(dayStart).setHours(23, 59, 59, 999) - dayStart.getTime();
  
    const normalizedStartPercentage = ((normalizedStartTime - dayStart.getTime()) / totalDayTime) * 100;
  
    return normalizedStartPercentage;
  };
  
  // Usage
  const startPosition = getStartPosition(bookings.startTime);
  console.log("This is the start position", startPosition);
  

  const getTotalBookingHours = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMs = end - start;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // console.log("This is the history response", bookings);

  return (
    <>
      {console.log("This is the history response", bookings)}
      <Nav />
      <Box
        sx={{
          p: 3,
          width: "100%",
          mx: "auto",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
            backdropFilter: "blur(5px)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            🚗 Your History
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
            <Grid2
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {bookings
                .filter(
                  (booking) =>
                    userInfo.role === "ADMIN" || booking.user.id === userInfo.id
                ) // Admin sees all, others see only their own
                .map((booking) => {
                  const statusColor =
                    booking.status === "SUCCESS"
                      ? "green"
                      : booking.status === "CANCELLED"
                      ? "red"
                      : "orange";
                  const timelineWidth = getTimelineWidth(
                    booking.startTime,
                    booking.endTime
                  );
                  const startPosition = getStartPosition(booking.startTime);
                  console.log("This is the start position", startPosition);
                  console.log("This is the timeline width", timelineWidth);
                  const totalBookingTime = getTotalBookingHours(
                    booking.startTime,
                    booking.endTime
                  );

                  return (
                    <Grid2
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={booking.id}
                      sx={{
                        animation: "fadeIn 0.6s ease-out",
                        "@keyframes fadeIn": {
                          "0%": { opacity: 0 },
                          "100%": { opacity: 1 },
                        },
                      }}
                    >
                      <Card
                        sx={{
                          background: "#ffffff",
                          color: "black",
                          borderRadius: "15px",
                          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                          },
                          border: `2px solid ${statusColor}`,
                          width: "100%",
                          maxWidth: 350,
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 2,
                              marginBottom: 2,
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar
                                alt="Profile Picture"
                                src={`${HOST}${booking.user.profilePic}`} // User profile picture
                                sx={{ width: 40, height: 40 }}
                              />
                              <DirectionsCarIcon
                                fontSize="large"
                                sx={{ color: statusColor }}
                              />
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {booking.parking.name}
                            </Typography>
                          </Box>

                          <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="body2">
                              📅 Start Time:{" "}
                              {new Date(booking.startTime).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              📅 End Time:{" "}
                              {new Date(booking.endTime).toLocaleString()}
                            </Typography>
                          </Box>

                          {/* Timeframe Bar */}
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: 10,
                              backgroundColor: "#f0f0f0",
                              borderRadius: 5,
                            }}
                          >
                            {/* Colored section representing the booking */}
                            <Box
                              sx={{
                                position: "absolute",
                                left: `${startPosition}%`, // Position the start of the color
                                width: `${timelineWidth}%`, // Set the width based on booking duration
                                height: "100%",
                                background: `linear-gradient(90deg, ${statusColor}, transparent)`,
                                borderRadius: 5,
                              }}
                            />
                          </Box>

                          {/* Tooltip for total booking hours */}
                          <Tooltip
                            title={`Total Booking Time: ${totalBookingTime}`}
                            placement="top"
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 2,
                                fontWeight: "bold",
                                color: statusColor,
                                textTransform: "capitalize",
                              }}
                            >
                              Status: {booking.status}
                            </Typography>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </Grid2>
                  );
                })}
            </Grid2>
          )}
        </Box>
      </Box>
    </>
  );
};

export default History;
