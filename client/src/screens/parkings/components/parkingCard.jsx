import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { HOST } from "../../../utils/constants";
import dayjs from "dayjs";

const ParkingCard = ({ parking, endTime, userInfo, onSelect, onEdit, onNavigate }) => {
  return (
    <Card
      sx={{
        boxShadow: 5,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: 320,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      {/* Parking Image */}
      <CardMedia
        component="img"
        height="200"
        image={
          parking.parkingImage
            ? `${HOST}/${parking.parkingImage}`
            : `https://picsum.photos/320/240?random=${parking.id}`
        }
        alt={parking.name}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: { xs: "150px", sm: "200px", md: "250px" },
        }}
      />

      {/* Parking Details */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Parking Name */}
        <Typography variant="h5" fontWeight="bold" noWrap>
          {parking.name}
        </Typography>

        {/* Capacity and Available Slots (Aligned Left & Right, Numbers Centered Below) */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0} px={0}>
          {/* Total Capacity (Left) */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <DirectionsCarIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                Total Capacity
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ textAlign: "center", marginTop: "2px", width: "100%" }}
            >
              {parking.highestSlots}
            </Typography>
          </Box>

          {/* Available Slots (Right) */}
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Box display="flex" alignItems="center">
              <DirectionsCarIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                Available Slots
              </Typography>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ 
                color: parking.availableSlots > 0 ? "green" : "red",
                textAlign: "center",
                marginTop: "2px",
                width: "100%",
              }}
            >
              {parking.availableSlots}
            </Typography>
          </Box>
        </Box>

        {/* Availability Time */}
        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 0.5,
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            Available until <span style={{ color: "#000", fontSize: "1rem" }}>{dayjs(endTime).format("HH:mm")}</span>
          </Typography>
        </Box>

        {/* Booking & Actions Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          {/* BOOK Button (Takes More Space) */}
          <Tooltip
            title={parking.availableSlots === 0 && userInfo.role !== "ADMIN" ? "No available slots" : ""}
            arrow
          >
            <span style={{ flexGrow: 1 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  flexGrow: 1,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  width: "100%",
                }}
                onClick={() => onSelect(parking)}
                disabled={parking.availableSlots === 0 && userInfo.role !== "ADMIN"}
              >
                BOOK
              </Button>
            </span>
          </Tooltip>

          {/* Edit Button (Only for Admin) */}
          {userInfo.role === "ADMIN" && (
            <Tooltip title="Edit Parking">
              <IconButton color="primary" sx={{ ml: 1 }} onClick={() => onEdit(parking)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Location Button */}
          <Tooltip title="View Location on Google Maps">
            <IconButton
              variant="contained"
              color="secondary"
              sx={{ ml: 1, borderRadius: "50%", p: "10px" }}
              onClick={() =>
                onNavigate(parking.location.coordinates[1], parking.location.coordinates[0])
              }
            >
              <LocationOnIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParkingCard;
