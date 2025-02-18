import { useState } from "react";
import OrganisationForm from "../component/organisationForm";
import { addOrganisation } from "../api";
import { Box, Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_THEME } from "../../../utils/constants";
const OrganisationContainer = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactDetails: "",
    location: "",
    totalParkingSlots: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.totalParkingSlots.trim())
      errors.totalParkingSlots = "Total Parking Slots is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      await addOrganisation(formData);
      setSuccessMessage("Organisation added successfully!");
      setFormData({
        name: "",
        address: "",
        contactDetails: "",
        location: "",
        totalParkingSlots: "",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding organisation:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: `${BACKGROUND_THEME}`,
        minHeight: "100vh", // Full screen height
        width: "100vw", // Full screen width
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        className="flex items-center justify-center min-h-screen"
        sx={{ backgroundColor: `${BACKGROUND_THEME}` }}
      >
        <Grid2>
          {successMessage && (
            <Typography className="text-green-600 text-center">
              {successMessage}
            </Typography>
          )}
          <OrganisationForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Grid2>
      </Container>
    </Box>
  );
};

export default OrganisationContainer;
