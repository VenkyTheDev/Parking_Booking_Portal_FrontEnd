import React, { useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "../../nav";
import { addParking, uploadParkingImage } from "../api";
import { useAppStore } from "../../../store";
import ParkingForm from "../component/parkingForm";
import { BACKGROUND_THEME } from "../../../utils/constants";

const AddParking = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const [organisationId] = useState(userInfo.organisation.id);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [highestSlots, setHighestSlots] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFetchLocation = () => {
    toast.info("Fetching location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          toast.success("Location fetched successfully!", { autoClose: 1000 });
        },
        () => {
          toast.error("Failed to fetch location.", { autoClose: 1000 });
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSave = async () => {
    const payload = { organisationId, highestSlots, name, latitude, longitude };
    setLoading(true);
    try {
      const newParking = await addParking(payload);
      if (image) {
        await uploadParkingImage(newParking.id, image);
      }
      toast.success("Parking added successfully!");
      navigate("/parkings");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ minHeight: "100vh", backgroundColor : `${BACKGROUND_THEME}`, backgroundSize: "cover", backgroundPosition: "center", p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ParkingForm
          name={name}
          setName={setName}
          highestSlots={highestSlots}
          setHighestSlots={setHighestSlots}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          handleFetchLocation={handleFetchLocation}
          handleSave={handleSave}
          loading={loading}
          image={image}
          handleImageSelect={handleImageSelect}
        />
      </Box>
    </>
  );
};

export default AddParking;
