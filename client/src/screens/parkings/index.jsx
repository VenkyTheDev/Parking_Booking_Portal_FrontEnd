// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Nav from "../nav";
// import { apiClient } from "../../lib/api-client";
// import { ALL_PARKINGS, HOST } from "../../utils/constants";
// import bgImage from "/bgImg.jpg";
// import Grid2 from "@mui/material/Grid2";
// import { useAppStore } from "../../store";
// import dayjs from "dayjs"; // Ensure dayjs is installed

// const Parkings = () => {
//   const navigate = useNavigate();
//   const [parkingSpots, setParkingSpots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { userInfo } = useAppStore();

//   const [selectedHours, setSelectedHours] = useState(1); // Default 1 hour
//   const [endTime, setEndTime] = useState(
//     dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm:ss")
//   ); // Default endTime

//   // Function to fetch parking spots
//   useEffect(() => {
//     const fetchParkingSpots = async () => {
//       try {
//         setLoading(true);
//         const response = await apiClient.get(
//           `${ALL_PARKINGS}?endTime=${endTime}`
//         );
//         setParkingSpots(response.data);
//       } catch (error) {
//         setError("Failed to fetch parking spots.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchParkingSpots();
//   }, [endTime]); // Trigger fetch when endTime changes

//   // Handle navigate to Google Maps
//   const handleNavigateToLocation = (lat, lng) => {
//     console.log("This is lat" , lat);
//     console.log("This is long" , lng);
//     const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(googleMapsUrl, "_blank");
//   };

//   // Handle select parking
//   const handleSelectParking = (parking) => {
//     navigate("/book", {
//       state: { parkingId: parking.id, parkingName: parking.name , parkingLatitude: parking.location.coordinates.at(0) , parkingLongitude: parking.location.coordinates.at(1) },
//     });
//   };

//   // Handle edit parking
//   const handleEditParking = (parking) => {
//     navigate("/editParking", {
//       state: {
//         parkingId: parking.id,
//         parkingName: parking.name,
//         parkingImage: parking.parkingImage,
//         parkingSlots: parking.highestSlots,
//         parkingLatitude: parking.location?.y,
//         parkingLongitude: parking.location?.x,
//       },
//     });
//   };

//   // Handle add parking
//   const handleAddParking = () => {
//     navigate("/addParking");
//   };

//   // Handle end time change
//   const handleEndTimeChange = (event) => {
//     const selectedHour = parseInt(event.target.value, 10);
//     setSelectedHours(selectedHour);
//     setEndTime(dayjs().add(selectedHour, "hour").format("YYYY-MM-DDTHH:mm:ss"));
//   };

//   console.log("This is the parking spots" , parkingSpots);

//   // Render the parking spots
//   return (
//     <>
//       <Nav />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           p: 4,
//         }}
//       >
//         <Typography
//           variant="h3"
//           fontWeight="bold"
//           textAlign="center"
//           color="white"
//           mb={4}
//         >
//           Select a Parking Spot
//         </Typography>

//         {/* Dropdown for selecting endTime */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             mb: 2,
//             zIndex: 10,
//           }}
//         >
//           <select
//             value={selectedHours}
//             onChange={handleEndTimeChange}
//             style={{
//               padding: "10px",
//               fontSize: "16px",
//               backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
//               color: "#000",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for better visibility
//             }}
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hour) => (
//               <option key={hour} value={hour}>
//                 {hour} Hour{hour > 1 ? "s" : ""}
//               </option>
//             ))}
//           </select>
//         </Box>

//         {loading ? (
//           <Box display="flex" justifyContent="center">
//             <CircularProgress sx={{ color: "white" }} />
//           </Box>
//         ) : error ? (
//           <Alert severity="error">{error}</Alert>
//         ) : parkingSpots.length === 0 ? (
//           <Alert severity="info">No parking spots available.</Alert>
//         ) : (
//           <Grid2 container spacing={3} justifyContent="center">
//             {parkingSpots.map((parking) => (
//               <Grid2 item xs={12} sm={6} md={4} key={parking.id}>
//                 <Card
//                   sx={{
//                     boxShadow: 5,
//                     borderRadius: 4,
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     width: 320,
//                     transition: "0.3s",
//                     "&:hover": { transform: "scale(1.05)" },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={
//                       parking.parkingImage
//                         ? `${HOST}/${parking.parkingImage}`
//                         : `https://picsum.photos/320/240?random=${parking.id}`
//                     }
//                     alt={parking.name}
//                     sx={{
//                       objectFit: "cover",
//                       width: "100%",
//                       height: {
//                         xs: "150px",
//                         sm: "200px",
//                         md: "250px",
//                       },
//                     }}
//                   />
//                   <CardContent
//                     sx={{
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography variant="h5" fontWeight="bold" noWrap>
//                       {parking.name}
//                     </Typography>
//                     <Typography
//                       variant="h7"
//                       fontWeight="semi-bold"
//                       color="text.secondary"
//                       noWrap
//                     >
//                       Total Capacity {parking.highestSlots}
//                     </Typography>
//                     <Typography
//                       variant="h7"
//                       fontWeight="semi-bold"
//                       color="text.secondary"
//                       noWrap
//                     >
//                       Available Slots till {dayjs(endTime).format("HH:mm")}{"Hr"} :- 
//                       {parking.availableSlots}
//                     </Typography>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       mt={2}
//                     >
//                       <Button
//                         variant="contained"
//                         sx={{ flexGrow: 1, borderRadius: "20px" }}
//                         onClick={() => handleSelectParking(parking)}
//                       >
//                         Book
//                       </Button>
//                       {userInfo.role === "ADMIN" && (
//                         <Tooltip title="Edit Parking">
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleEditParking(parking)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                       )}
//                       <Tooltip title="View Location on Google Maps">
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           sx={{ ml: 1, minWidth: "40px", borderRadius: "50%" }}
//                           onClick={() =>
//                             handleNavigateToLocation(
//                               parking.location.coordinates.at(1),
//                               parking.location.coordinates.at(0)
//                             )
//                           }
//                         >
//                           <LocationOnIcon />
//                         </Button>
//                       </Tooltip>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid2>
//             ))}
//           </Grid2>
//         )}

//         {userInfo?.role === "ADMIN" && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddParking}
//               sx={{ borderRadius: "20px", padding: "10px 20px" }}
//             >
//               Add Parking
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </>
//   );
// };

// export default Parkings;


import Parkings from "./container/parking";
export default Parkings;