import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Nav from "../../nav";

const OrganisationForm = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <>
      <Nav />
      <Box
        sx={{
          p: 4,
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
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
          Add Organisation
        </Typography>

        <TextField
          fullWidth
          label="Organisation Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Contact Details"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Total Parking Slots *"
          name="totalParkingSlots"
          type="number"
          value={formData.totalParkingSlots}
          onChange={handleChange}
          error={!!errors.totalParkingSlots}
          helperText={errors.totalParkingSlots}
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            width: "100%",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Add Organisation
        </Button>
      </Box>
    </>
  );
};

export default OrganisationForm;