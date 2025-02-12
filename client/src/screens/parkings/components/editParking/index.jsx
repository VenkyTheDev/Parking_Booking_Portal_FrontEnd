import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import { apiClient } from "../../../../lib/api-client";
import { ADD_PARKING_IMAGE, EDIT_PARKING } from "../../../../utils/constants";
import bgImage from "/bgImg.jpg";
import Nav from "../../../nav";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit'; // Import the edit icon

const EditParking = () => {
  console.log("I'm in the edit parking");
  const navigate = useNavigate();
  const location = useLocation();
  const { parkingId, parkingName, parkingImage, parkingSlots, parkingLocation } = location.state || {};

  const [image, setImage] = useState(parkingImage || "");
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parkingId", parkingId); // Add the parkingId as a FormData field
  
      try {
        // Correct API URL with query parameter for parkingId
        const response = await apiClient.post(ADD_PARKING_IMAGE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("This is the response of the edit parking", response);
  
        // After a successful upload, set the image and show a success toast
        setImage(response.data.imageUrl); // Assuming the response contains the image URL
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Make API request to update parking details
      await apiClient.put(`${EDIT_PARKING}/${parkingId}`, {
        image,
        name,
        highestSlots,
        location: {
          type: "Point", // Assuming GeoJSON Point for location
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      });
      navigate("/parkings"); // Redirect to parkings list page after saving
    } catch (error) {
      console.error("Error updating parking", error);
      toast.error("Failed to save parking details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Could not fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Edit Parking
        </Typography>

        <Box
          sx={{
            mb: 4,
            borderRadius: "50%", // Makes the container circular
            overflow: "hidden",
            position: "relative",
            width: "150px", // Adjust size as needed
            height: "150px", // Adjust size as needed
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "4px solid white", // Add a border to the image (like a profile image)
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {!image && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="h5">Parking Image</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  color: "black",
                }}
                onClick={() => document.getElementById("image-upload").click()}
              >
                Upload Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Box>
          )}

          {/* Edit icon button */}
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
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <>
            <TextField
              label="Parking Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
              }}
            />
            <TextField
              label="Highest Slots"
              variant="outlined"
              fullWidth
              type="number"
              value={highestSlots}
              onChange={(e) => setHighestSlots(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
              }}
            />
            <TextField
              label="Latitude"
              variant="outlined"
              fullWidth
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
              }}
            />
            <TextField
              label="Longitude"
              variant="outlined"
              fullWidth
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
              }}
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
                onClick={fetchLocation}
              >
                Get Current Location
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default EditParking;
