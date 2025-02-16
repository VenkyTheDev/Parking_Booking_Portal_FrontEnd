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
import {
  formatTime,
  getTimelineWidth,
  getStartPosition,
  getTotalBookingHours,
} from "../../../utils/historyUtils";
import { HOST } from "../../../utils/constants";

const BookingCard = ({ booking }) => {
  const statusColor =
    booking.status === "SUCCESS"
      ? "green"
      : booking.status === "CANCELLED"
      ? "red"
      : "orange";
  const timelineWidth = getTimelineWidth(booking.startTime, booking.endTime);
  const startPosition = getStartPosition(booking.startTime);
  const totalBookingTime = getTotalBookingHours(
    booking.startTime,
    booking.endTime
  );

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
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            marginBottom: 2,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="Profile Picture"
              src={`${HOST}${booking.user.profilePic}`}
              sx={{ width: 40, height: 40 }}
            />
            <DirectionsCarIcon fontSize="large" sx={{ color: statusColor }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {booking.parking.name}
          </Typography>
        </Box>

        <Typography variant="body2">
          📅 Start Time of booking:{" "}
          {new Date(booking.startTime).toLocaleString()}
        </Typography>
        <Typography variant="body2" sx = {{mb: 2}}>
          📅 End Time of booking: {new Date(booking.endTime).toLocaleString()}
        </Typography>

        {/* Timeline Bar */}
        {/* <Typography>Start time</Typography>
        <Box sx={{ position: "relative", width: "100%", height: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
          <Box sx={{ position: "absolute", left: `${startPosition}%`, width: `${timelineWidth}%`, height: "100%", background: `linear-gradient(90deg, ${statusColor}, transparent)`, borderRadius: 5 }} />
        </Box>
        <Typography>End time</Typography> */}

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 5,
          }}
        >
          {/* Status Bar */}
          <Box
            sx={{
              position: "absolute",
              left: `${startPosition}%`,
              width: `${timelineWidth}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${statusColor}, transparent)`,
              borderRadius: 5,
            }}
          />

          {/* Start Time Label - Positioned at Start of Status Bar (Above) */}
          <Typography
            sx={{
              position: "absolute",
              left: `${startPosition}%`,
              top: -18, // Moves text above the bar
              fontSize: "0.75rem", // Tiny font
              transform: "translateX(-50%)", // Centers text
              whiteSpace: "nowrap",
            }}
          >
            Start Time {booking.startTime}
          </Typography>

          {/* End Time Label - Positioned at End of Status Bar (Below) */}
          <Typography
            sx={{
              position: "absolute",
              left: `${startPosition + timelineWidth}%`,
              top: 12, // Moves text below the bar
              fontSize: "0.75rem", // Tiny font
              transform: "translateX(-50%)", // Centers text
              whiteSpace: "nowrap",
            }}
          >
            End Time {booking.endTime}
          </Typography>
        </Box>

        <Tooltip
          title={`Total Booking Time: ${totalBookingTime}`}
          placement="top"
        >
          <Typography
            variant="body2"
            sx={{ mt: 2, fontWeight: "bold", color: statusColor }}
          >
            Status: {booking.status}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
