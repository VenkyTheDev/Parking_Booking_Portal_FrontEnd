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
          📅 Date of booking: {new Date(booking.startTime).toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            marginTop: 3,
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

          <Typography
            sx={{
              position: "absolute",
              left: `calc(min(100%, max(0%, ${startPosition}%)))`, // Ensures it stays within 0% - 100%
              top: -18,
              fontSize: "0.75rem",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              maxWidth: "100%", // Prevents text from overflowing
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            ⏰ Start Time:{" "}
            {new Date(booking.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>

          <Typography
            sx={{
              position: "absolute",
              left: `calc(min(100%, max(0%, ${
                startPosition + timelineWidth
              }%)))`, // Ensures it stays within 0% - 100%
              top: 12,
              fontSize: "0.75rem",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              maxWidth: "100%", // Prevents text from overflowing
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            ⏰ End Time:{" "}
            {new Date(booking.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
