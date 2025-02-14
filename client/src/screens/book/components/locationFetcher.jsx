import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Typography } from "@mui/material";

const LocationFetcher = ({ onLocationRetrieved }) => {
  const [locationText, setLocationText] = useState("Fetching location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocationText(`Lat: ${latitude}, Lng: ${longitude}`);
          setLoading(false);
          toast.success("Location retrieved successfully.", { autoClose: 1000 });
          onLocationRetrieved(latitude, longitude);
        },
        () => {
          toast.error("Could not retrieve location.", { autoClose: 1000 });
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported.", { autoClose: 1000 });
      setLoading(false);
    }
  }, [onLocationRetrieved]);

  return loading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    <Typography variant="body1">{locationText}</Typography>
  );
};

export default LocationFetcher;
