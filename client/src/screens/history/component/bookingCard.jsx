import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { formatTime, getTimelineWidth, getStartPosition, getTotalBookingHours } from "../containers/historyContainer";
import { HOST } from "../../../utils/constants";


const BookingCard = ({ booking }) => {
  const statusColor =
    booking.status === "SUCCESS" ? "green" : booking.status === "CANCELLED" ? "red" : "orange";

  const timelineWidth = getTimelineWidth(booking.startTime, booking.endTime);
  const startPosition = getStartPosition(booking.startTime);
  const totalBookingTime = getTotalBookingHours(booking.startTime, booking.endTime);

  return (
    <Card
      sx={{
        background: "#ffffff",
        color: "black",
        borderRadius: "15px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
          <Avatar alt="Profile Picture" src={`${HOST}${booking.user.profilePic}`} sx={{ width: 40, height: 40 }} />
          <DirectionsCarIcon fontSize="large" sx={{ color: statusColor }} />
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {booking.parking.name}
        </Typography>

        <Typography variant="body2">📅 Start: {new Date(booking.startTime).toLocaleString()}</Typography>
        <Typography variant="body2">📅 End: {new Date(booking.endTime).toLocaleString()}</Typography>

        {/* Timeline Bar */}
        <Box sx={{ position: "relative", width: "100%", height: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
          <Box sx={{ position: "absolute", left: `${startPosition}%`, width: `${timelineWidth}%`, height: "100%", background: `linear-gradient(90deg, ${statusColor}, transparent)`, borderRadius: 5 }} />
        </Box>

        <Tooltip title={`Total Booking Time: ${totalBookingTime}`} placement="top">
          <Typography variant="body2" sx={{ mt: 2, fontWeight: "bold", color: statusColor }}>
            Status: {booking.status}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
