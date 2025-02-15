import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Tooltip, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
        image={parking.parkingImage ? `${HOST}/${parking.parkingImage}` : `https://picsum.photos/320/240?random=${parking.id}`}
        alt={parking.name}
        sx={{ objectFit: "cover", width: "100%", height: { xs: "150px", sm: "200px", md: "250px" } }}
      />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold" noWrap>{parking.name}</Typography>
        <Typography variant="h7" fontWeight="semi-bold" color="text.secondary" noWrap>
          Total Capacity: {parking.highestSlots}
        </Typography>
        <Typography variant="h7" fontWeight="semi-bold" color="text.secondary" noWrap>
          Available Slots till {dayjs(endTime).format("HH:mm")}Hr: {parking.availableSlots}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button variant="contained" sx={{ flexGrow: 1, borderRadius: "20px" }} onClick={() => onSelect(parking)}>Book</Button>
          {userInfo.role === "ADMIN" && (
            <Tooltip title="Edit Parking">
              <IconButton color="primary" onClick={() => onEdit(parking)}><EditIcon /></IconButton>
            </Tooltip>
          )}
          <Tooltip title="View Location on Google Maps">
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1, minWidth: "40px", borderRadius: "50%" }}
              onClick={() => onNavigate(parking.location.coordinates[1], parking.location.coordinates[0])}
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
