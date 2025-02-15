// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
// import bgImage from "/bgImg.jpg";
// import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
// import { ADD_PARKING, ADD_PARKING_IMAGE } from "../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { useAppStore } from "../../store";
// import Nav from "../nav";
// import { apiClient } from "../../lib/api-client";

// const AddParking = () => {
//   const { userInfo } = useAppStore();
//   const [organisationId, setOrganisationId] = useState(userInfo.organisation.id);
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [highestSlots, setHighestSlots] = useState(0);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle image selection (no API for now)
//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file); // Set the image file directly in state
//     }
//   };

//   // Handle location fetch
//   const handleFetchLocation = () => {
//     toast.info("Fetching location...");

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           toast.dismiss();
//           toast.success("Location fetched successfully!", { autoClose: 1000 });
//         },
//         (error) => {
//           toast.dismiss();
//           toast.error("Failed to fetch location.", { autoClose: 1000 });
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle save of new parking
//   const handleSave = async () => {
//     const payload = {
//       organisationId: organisationId,
//       highestSlots: highestSlots,
//       name: name,
//       latitude: latitude,
//       longitude: longitude,
//     };

//     setLoading(true);
//     try {
//       const response = await apiClient.post(ADD_PARKING, payload);
//       console.log("This is the response after creating a new parking", response);

//       // Assuming the parking ID is returned in the response
//       const parkingId = response.data.id; // Get the parking ID from the response

//       if (image) {
//         // Now upload the image after parking is created
//         await handleImageUpload(parkingId); // Wait for image upload to complete
//       } else {
//         toast.success("Parking added successfully!");
//         navigate("/parkings"); // Navigate to parkings page
//       }
//     } catch (error) {
//       console.error("Error adding parking:", error);
//       toast.error("Failed to add parking. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image upload using parking ID
//   const handleImageUpload = async (parkingId) => {
//     const formData = new FormData();
//     formData.append("file", image); // Attach the selected image to the form data
//     formData.append("parkingId", parkingId); // Attach parkingId

//     try {
//       // Call the API to upload the image for the parking
//       const response = await apiClient.post(ADD_PARKING_IMAGE, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("This is the response of the add parking image" , response);
//       const uploadedImageUrl = response.data.parkingImage;
//       toast.success("Image uploaded successfully!");
//       navigate("/parkings"); // Navigate to parkings page
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image.");
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           p: 4,
//           color: "white",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             p: 3,
//             background:
//               "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
//             backdropFilter: "blur(5px)",
//             borderRadius: "15px",
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//             width: "100%",
//             maxWidth: 600,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" mb={4}>
//             Add Parking
//           </Typography>

//           <Box
//             sx={{
//               borderRadius: "15px",
//               overflow: "hidden",
//               position: "relative",
//               width: "250px",
//               height: "150px",
//               backgroundImage: image ? `url(${URL.createObjectURL(image)})` : "none", // Display image if available
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               border: "4px solid white",
//               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {!image && (
//               <Typography variant="h5" textAlign="center" color="white">
//                 Parking Image
//               </Typography>
//             )}

//             <IconButton
//               sx={{
//                 position: "absolute",
//                 bottom: 0,
//                 right: 0,
//                 bgcolor: "rgba(0, 0, 0, 0.5)",
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: "rgba(0, 0, 0, 0.7)",
//                 },
//               }}
//               onClick={() => document.getElementById("image-upload").click()}
//             >
//               <EditIcon />
//             </IconButton>
//             <input
//               id="image-upload"
//               type="file"
//               accept="image/*"
//               onChange={handleImageSelect}
//               style={{ display: "none" }}
//             />
//           </Box>

//           <TextField
//             label="Parking Name"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{ mt: 3 }}
//           />
//           <TextField
//             label="Highest Slots"
//             fullWidth
//             type="number"
//             value={highestSlots}
//             onChange={(e) => setHighestSlots(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Latitude"
//             fullWidth
//             type="number"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Longitude"
//             fullWidth
//             type="number"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//             sx={{ mt: 2 }}
//           />

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleFetchLocation}
//             sx={{ mt: 3 }}
//           >
//             Fetch Location
//           </Button>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             sx={{ mt: 3 }}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AddParking;

import AddParking from "./container/addParking";
export default AddParking;