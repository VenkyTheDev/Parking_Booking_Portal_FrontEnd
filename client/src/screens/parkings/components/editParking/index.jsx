import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { apiClient } from "../../../../lib/api-client";
import { ADD_PARKING_IMAGE, EDIT_PARKING, HOST } from "../../../../utils/constants";
import bgImage from "/bgImg.jpg";
import Nav from "../../../nav";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useAppStore } from "../../../../store"; // Import the store to set parking info

const EditParking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parkingId, parkingName, parkingImage, parkingSlots, parkingLocation } = location.state || {};

  const { parkingInfo, setParkingInfo } = useAppStore((state) => state); // Extract the setParkingInfo function from the store

  const [image, setImage] = useState(parkingImage || ""); // Initialize state with parkingImage from location
  const [name, setName] = useState(parkingName || "");
  const [highestSlots, setHighestSlots] = useState(parkingSlots || 0);
  const [latitude, setLatitude] = useState(parkingLocation?.latitude || "");
  const [longitude, setLongitude] = useState(parkingLocation?.longitude || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!parkingId) {
      navigate("/parkings");
    }
  }, [parkingId, navigate]);

  useEffect(() => {
    if (image) {
      setImage(image);
    }
  }, [image]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parkingId", parkingId);

      try {
        const response = await apiClient.post(ADD_PARKING_IMAGE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Get the new image URL from the response and update both state and store
        const uploadedImageUrl = response.data.parkingImage;
        
        // Set the image state to the new image URL
        setImage(`${HOST}/${uploadedImageUrl}`);

        // Update the store with the new image URL
        setParkingInfo({ 
          ...parkingInfo,
          parkingImage: uploadedImageUrl
        });

        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          toast.success("Location fetched successfully!");
        },
        (error) => {
          toast.error("Failed to fetch location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSave = () => {
    // Save parking information to store or send it to an API for saving
    setParkingInfo({
      ...parkingInfo,
      parkingName: name,
      parkingSlots: highestSlots,
      parkingLocation: { latitude, longitude },
      parkingImage: image,
    });
    toast.success("Parking info saved!");
    // You can now perform your API call to save the data
  };

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 4,
          color: "white",
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
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            width: "150px",
            height: "150px",
            backgroundImage: `url(${image})`, // Use the updated image state
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "4px solid white",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!image && (
            <Typography variant="h5" textAlign="center" color="white">
              Parking Image
            </Typography>
          )}

          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            onClick={() => document.getElementById("image-upload").click()}
          >
            <EditIcon />
          </IconButton>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
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
    </>
  );
};

export default EditParking;
