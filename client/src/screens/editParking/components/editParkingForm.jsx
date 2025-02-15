import React from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { HOST } from "../../../utils/constants";

const EditParkingForm = ({
  name,
  setName,
  highestSlots,
  setHighestSlots,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  handleFetchLocation,
  handleSave,
  handleImageUpload,
  image,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
        backdropFilter: "blur(5px)",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Edit Parking
      </Typography>

      <Box
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
          width: "250px",
          height: "150px",
          backgroundImage: `url(${HOST}/${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "4px solid white",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!image && <Typography variant="h5" textAlign="center" color="white">Parking Image</Typography>}

        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
          }}
          onClick={() => document.getElementById("image-upload").click()}
        >
          <EditIcon />
        </IconButton>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
      </Box>

      <TextField label="Parking Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 3 }} />
      <TextField label="Highest Slots" fullWidth type="number" value={highestSlots} onChange={(e) => setHighestSlots(e.target.value)} sx={{ mt: 2 }} />
      <TextField label="Latitude" fullWidth type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} sx={{ mt: 2 }} />
      <TextField label="Longitude" fullWidth type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} sx={{ mt: 2 }} />

      <Button variant="contained" color="primary" onClick={handleFetchLocation} sx={{ mt: 3 }}>
        Fetch Location
      </Button>

      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
        Save
      </Button>
    </Box>
  );
};

export default EditParkingForm;
