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

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} px={1}>
          <Box display="flex" flexDirection="column" alignItems="center" width="50%">
            <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
              <DirectionsCarIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Total Capacity
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {parking.highestSlots}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" width="50%">
            <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
              <DirectionsCarIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Available Slots
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: parking.availableSlots > 0 ? "green" : "red" }}
            >
              {parking.availableSlots}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1.5,
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            Available until <span style={{ color: "#000", fontSize: "1rem" }}>{dayjs(endTime).format("HH:mm")}</span>
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Tooltip
            title={parking.availableSlots === 0 && userInfo.role !== "ADMIN" ? "No available slots" : ""}
            arrow
          >
            <span>
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

          {userInfo.role === "ADMIN" && (
            <Tooltip title="Edit Parking">
              <IconButton color="primary" sx={{ ml: 1 }} onClick={() => onEdit(parking)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="View Location on Google Maps">
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1, minWidth: "40px", borderRadius: "50%", p: "10px" }}
              onClick={() =>
                onNavigate(parking.location.coordinates[1], parking.location.coordinates[0])
              }
            >
              <LocationOnIcon />
            </Button>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParkingCard;
