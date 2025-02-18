import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import Nav from "../../nav";
import bgImage from "/bgImg.jpg";
import { uploadParkingImage, updateParking } from "../api";
import EditParkingForm from "../components/editParkingForm";
import { useAppStore } from "../../../store";
import { HOST, BACKGROUND_THEME } from "../../../utils/constants";

const EditParking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parkingId, parkingName, parkingImage, parkingSlots, parkingLatitude, parkingLongitude } = location.state || {};
  const { parkingInfo, setParkingInfo } = useAppStore();

  const [image, setImage] = useState(parkingImage || "");
  const [name, setName] = useState(parkingName || "");
  const [highestSlots, setHighestSlots] = useState(parkingSlots || 0);
  const [latitude, setLatitude] = useState(parkingLatitude || "");
  const [longitude, setLongitude] = useState(parkingLongitude || "");
  
  useEffect(() => {
    if (!parkingId) navigate("/parkings");

    if (parkingInfo?.parkingImage) {
      setImage(parkingInfo.parkingImage.startsWith("http") ? parkingInfo.parkingImage : `${HOST}/${parkingInfo.parkingImage.replace(/^\/+/, "")}`);
    }
  }, [parkingId, navigate, parkingInfo, parkingImage]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const uploadedImageUrl = await uploadParkingImage(parkingId, file);
        setImage(uploadedImageUrl);
        toast.dismiss();    
      toast.success("Image uploaded successfully!",{
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFetchLocation = () => {
    toast.info("Fetching location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        toast.dismiss();
        toast.success("Location fetched successfully!",{
          autoClose:1000
        });
      },
      () => toast.error("Failed to fetch location.")
    );
  };

  const handleSave = async () => {
    try {
      await updateParking({ id: parkingId, highestSlots, name, latitude, longitude });
      toast.success("Parking updated successfully!",{
        autoClose:1000
      });
      navigate("/parkings");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ minHeight: "100vh", backgroundColor : `${BACKGROUND_THEME}`, backgroundSize: "cover", backgroundPosition: "center", p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <EditParkingForm {...{ name, setName, highestSlots, setHighestSlots, latitude, setLatitude, longitude, setLongitude, handleFetchLocation, handleSave, handleImageUpload, image }} />
      </Box>
    </>
  );
};

export default EditParking;
