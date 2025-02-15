// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
// import { ADD_PARKING_IMAGE, EDIT_PARKING, HOST } from "../../utils/constants";
// import bgImage from "/bgImg.jpg";
// import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
// import Nav from "../nav";
// import { apiClient } from "../../lib/api-client";
// import { useAppStore } from "../../store";
// const EditParking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { parkingId, parkingName, parkingImage, parkingSlots, parkingLatitude , parkingLongitude } = location.state || {};
// //   console.log("This is the parking Location from the edit parking", parkingLocation);

// console.log("This is the parkinglATITUDE" , parkingLatitude);
// console.log("This is the parkingLongitude" , parkingLongitude);

//   const { parkingInfo, setParkingInfo } = useAppStore((state) => state);

//   const [image, setImage] = useState(parkingImage || "");
//   const [name, setName] = useState(parkingName || "");
//   const [highestSlots, setHighestSlots] = useState(parkingSlots || 0);
//   const [latitude, setLatitude] = useState(parkingLatitude || "");
//   const [longitude, setLongitude] = useState(parkingLongitude || "");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("parkingId", parkingId);

//       try {
//         const response = await apiClient.post(ADD_PARKING_IMAGE, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         console.log("This is the response of the add parking image" , response);

//         const uploadedImageUrl = response.data.parkingImage;
//         console.log("This is the uploadImgUrl" , uploadedImageUrl);
//         setImage(`${HOST}/${uploadedImageUrl}`);

//         setParkingInfo({
//           ...parkingInfo,
//           parkingImage: uploadedImageUrl,
//         });

//         toast.success("Image uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         toast.error("Failed to upload image. Please try again.");
//       }
//     }
//   };

//   const handleFetchLocation = () => {
//     toast.info("Fetching location..."); // Show a loading toast when starting to fetch location

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           toast.dismiss();
//           toast.success("Location fetched successfully!", {
//             autoClose: 1000,
//           }); // Success toast
//         },
//         (error) => {
//           toast.dismiss();
//           toast.error("Failed to fetch location.", {
//             autoClose: 1000,
//           }); // Error toast
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser."); // Error if geolocation is not supported
//     }
//   };

//   const handleSave = async () => {
//     const payload = {
//       id: parkingId,
//       highestSlots: highestSlots,
//       name: name,
//       latitude: latitude,
//       longitude: longitude,
//     };

//     console.log("This is my payload for the edit parking", payload);

//     try {
//       const response = await apiClient.put(EDIT_PARKING, payload, {
//         headers: {
//           "Content-Type": "application/json", // Ensure that the request is in JSON format
//         },
//       });
//       console.log("This is the response of the Edit Parking", response);

//       setParkingInfo({
//         ...parkingInfo,
//         parkingName: name,
//         parkingSlots: highestSlots,
//         parkingLocation: { latitude, longitude },
//         parkingImage: response.parkingImage, // Assuming you want the updated image URL from the response
//       });

//       toast.success("Parking info saved!");

//       if (response.status === 200) {
//         navigate("/parkings");
//       }
//     } catch (error) {
//       toast.error("Failed to save parking info. Please try again.");
//       console.error("Error saving parking info:", error);
//     }
//   };

//   useEffect(() => {
//     if (!parkingId) {
//       navigate("/parkings");
//       return;
//     }

//     // Ensure parkingImage is set correctly whether it's a full URL or a relative path
//     if (parkingInfo && parkingInfo.parkingImage) {
//       const imageUrl = parkingInfo.parkingImage.startsWith("http")
//         ? parkingInfo.parkingImage // If it's already a full URL
//         : `${HOST}/${parkingInfo.parkingImage.replace(/^\/+/, "")}`; // Otherwise, append the host part
//       setImage(imageUrl);
//     } else {
//       setImage(parkingImage || "");  // Fallback if the initial parkingImage is empty
//     }

//     if (parkingInfo?.name) {
//       setName(parkingInfo.name);
//     }

//   }, [parkingId, navigate, parkingInfo, parkingImage , image , handleSave]);

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
//         {/* Applying the glossy effect */}
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
//             Edit Parking
//           </Typography>

//           <Box
//             sx={{
//               borderRadius: "15px",
//               overflow: "hidden",
//               position: "relative",
//               width: "250px",
//               height: "150px",
//               backgroundImage: `url(${HOST}/${image})`,
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
//               onChange={handleImageUpload}
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
//           >
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default EditParking;

import EditParking from "./container/editParking";
export default EditParking;