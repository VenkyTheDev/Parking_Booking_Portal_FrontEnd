// import React, { useEffect, useState } from "react";
// import { useAppStore } from "../../store";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Alert,
//   Avatar,
//   Tooltip,
//   Pagination,
// } from "@mui/material";
// import Grid2 from "@mui/material/Grid2";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Parking icon
// import { HISTORY_ROUTE, HOST } from "../../utils/constants";
// import { apiClient } from "../../lib/api-client";
// import Nav from "../nav";
// import bgImage from "/bgImg.jpg";

// const History = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { userInfo } = useAppStore();

//   // Pagination state
//   const [page, setPage] = useState(0); // Current page (0-based)
//   const [totalPages, setTotalPages] = useState(0); // Total pages
//   const [totalItems, setTotalItems] = useState(0); // Total items

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true); // Start loading before fetching data
//       try {
//         const result = await apiClient.get(HISTORY_ROUTE, {
//           params: { page, size: 10 }, // Pass page and size for pagination
//           withCredentials: true, // Ensure cookies are sent with the request
//         });

//         const response = result.data.bookings;
//         if (Array.isArray(response)) {
//           setBookings(response);
//           setTotalItems(result.data.totalBookings); // Total bookings count from the API response
//           setTotalPages(Math.ceil(result.data.totalBookings / 10)); // Calculate total pages based on totalBookings
//         } else {
//           setError("Failed to fetch booking history. Invalid response format.");
//         }
//       } catch (err) {
//         setError("Failed to fetch booking history.");
//       } finally {
//         setLoading(false); // End loading after fetching data
//       }
//     };

//     fetchHistory();
//   }, [page, userInfo.id]); // Trigger effect when page or userInfo.id changes

//   const formatTime = (timeString) => {
//     const date = new Date(timeString);
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     return `${hours}:${minutes}`;
//   };

//   const getTimelineWidth = (startTime, endTime) => {
//     const dayStart = new Date(new Date().setHours(0, 0, 0, 0)); // Start of the current day (00:00)
//     const dayEnd = new Date(new Date().setHours(23, 59, 59, 999)); // End of the current day (23:59)

//     const normalizedStartTime =
//       new Date(startTime).getTime() - dayStart.getTime();
//     const normalizedEndTime = new Date(endTime).getTime() - dayStart.getTime();
//     const totalDayTime = dayEnd.getTime() - dayStart.getTime();

//     return ((normalizedEndTime - normalizedStartTime) / totalDayTime) * 100;
//   };

//   const getStartPosition = (startTime) => {
//     const dayStart = new Date();
//     dayStart.setHours(0, 0, 0, 0); // Start of the current day (00:00:00)

//     const startDate = new Date(startTime); // Convert startTime to a valid JavaScript Date object

//     const normalizedStartTime = new Date(dayStart); // Copy of the start of the day
//     normalizedStartTime.setHours(
//       startDate.getHours(),
//       startDate.getMinutes(),
//       startDate.getSeconds(),
//       startDate.getMilliseconds()
//     );

//     const totalDayTime =
//       new Date(dayStart).setHours(23, 59, 59, 999) - dayStart.getTime();

//     const normalizedStartPercentage =
//       ((normalizedStartTime - dayStart.getTime()) / totalDayTime) * 100;

//     return normalizedStartPercentage;
//   };

//   const getTotalBookingHours = (startTime, endTime) => {
//     const start = new Date(startTime);
//     const end = new Date(endTime);
//     const diffInMs = end - start;
//     const hours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <>
//       <Nav />
//       <Box
//         sx={{
//           p: 3,
//           width: "100%",
//           mx: "auto",
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           minHeight: "100vh",
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
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               mb: 2,
//               fontWeight: "bold",
//               textAlign: "center",
//               color: "#fff",
//             }}
//           >
//             🚗 Your History
//           </Typography>

//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
//               <CircularProgress sx={{ color: "#fff" }} />
//             </Box>
//           ) : error ? (
//             <Alert severity="error">{error}</Alert>
//           ) : bookings.length === 0 ? (
//             <Alert severity="info">No bookings found.</Alert>
//           ) : (
//             <Grid2
//               container
//               spacing={3}
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 3,
//               }}
//             >
//               {bookings
//                 .filter(
//                   (booking) =>
//                     userInfo.role === "ADMIN" || booking.user.id === userInfo.id
//                 ) // Admin sees all, others see only their own
//                 .map((booking) => {
//                   const statusColor =
//                     booking.status === "SUCCESS"
//                       ? "green"
//                       : booking.status === "CANCELLED"
//                       ? "red"
//                       : "orange";
//                   const timelineWidth = getTimelineWidth(
//                     booking.startTime,
//                     booking.endTime
//                   );
//                   const startPosition = getStartPosition(booking.startTime);
//                   const totalBookingTime = getTotalBookingHours(
//                     booking.startTime,
//                     booking.endTime
//                   );

//                   return (
//                     <Grid2
//                       item
//                       xs={12}
//                       sm={6}
//                       md={4}
//                       lg={3}
//                       key={booking.id}
//                       sx={{
//                         animation: "fadeIn 0.6s ease-out",
//                         "@keyframes fadeIn": {
//                           "0%": { opacity: 0 },
//                           "100%": { opacity: 1 },
//                         },
//                       }}
//                     >
//                       <Card
//                         sx={{
//                           background: "#ffffff",
//                           color: "black",
//                           borderRadius: "15px",
//                           boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//                           transition:
//                             "transform 0.3s ease, box-shadow 0.3s ease",
//                           "&:hover": {
//                             transform: "scale(1.05)",
//                             boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
//                           },
//                           border: `2px solid ${statusColor}`,
//                           width: "100%",
//                           maxWidth: 350,
//                         }}
//                       >
//                         <CardContent sx={{ p: 3 }}>
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "flex-start",
//                               gap: 2,
//                               marginBottom: 2,
//                               flexDirection: "column",
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 2,
//                               }}
//                             >
//                               <Avatar
//                                 alt="Profile Picture"
//                                 src={`${HOST}${booking.user.profilePic}`} // User profile picture
//                                 sx={{ width: 40, height: 40 }}
//                               />
//                               <DirectionsCarIcon
//                                 fontSize="large"
//                                 sx={{ color: statusColor }}
//                               />
//                             </Box>
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: "bold" }}
//                             >
//                               {booking.parking.name}
//                             </Typography>
//                           </Box>

//                           <Box sx={{ marginBottom: 2 }}>
//                             <Typography variant="body2">
//                               📅 Start Time:{" "}
//                               {new Date(booking.startTime).toLocaleString()}
//                             </Typography>
//                             <Typography variant="body2">
//                               📅 End Time:{" "}
//                               {new Date(booking.endTime).toLocaleString()}
//                             </Typography>
//                           </Box>

//                           {/* Timeframe Bar */}
//                           <Box
//                             sx={{
//                               position: "relative",
//                               width: "100%",
//                               height: 10,
//                               backgroundColor: "#f0f0f0",
//                               borderRadius: 5,
//                             }}
//                           >
//                             {/* Colored section representing the booking */}
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 left: `${startPosition}%`, // Position the start of the color
//                                 width: `${timelineWidth}%`, // Set the width based on booking duration
//                                 height: "100%",
//                                 background: `linear-gradient(90deg, ${statusColor}, transparent)`,
//                                 borderRadius: 5,
//                               }}
//                             />

//                             {/* Start Time */}
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 position: "absolute",
//                                 left: `${startPosition}%`,
//                                 top: "100%",
//                                 fontSize: {
//                                   xs: "8px", // Extra small screens (mobile)
//                                   sm: "10px", // Small screens (tablet)
//                                   md: "12px", // Medium screens (small desktop)
//                                   lg: "14px", // Large screens (large desktop)
//                                 },
//                                 color: "#000",
//                                 transform: "translateX(-50%)", // Center the text at the start position
//                                 whiteSpace: "nowrap", // Prevent the text from wrapping
//                                 textAlign: "center",
//                               }}
//                             >
//                               {formatTime(booking.startTime)}
//                             </Typography>

//                             {/* End Time */}
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 position: "absolute",
//                                 left: `${startPosition + timelineWidth}%`, // Position at the end of the bar
//                                 top: "100%",
//                                 fontSize: {
//                                   xs: "8px", // Extra small screens (mobile)
//                                   sm: "10px", // Small screens (tablet)
//                                   md: "12px", // Medium screens (small desktop)
//                                   lg: "14px", // Large screens (large desktop)
//                                 },
//                                 color: "#000",
//                                 transform: "translateX(-50%)", // Center the text at the end position
//                                 whiteSpace: "nowrap", // Prevent the text from wrapping
//                                 textAlign: "center",
//                               }}
//                             >
//                               {formatTime(booking.endTime)}
//                             </Typography>
//                           </Box>

//                           {/* Tooltip for total booking hours */}
//                           <Tooltip
//                             title={`Total Booking Time: ${totalBookingTime}`}
//                             placement="top"
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 mt: 2,
//                                 fontWeight: "bold",
//                                 color: statusColor,
//                                 textTransform: "capitalize",
//                               }}
//                             >
//                               Status: {booking.status}
//                             </Typography>
//                           </Tooltip>
//                         </CardContent>
//                       </Card>
//                     </Grid2>
//                   );
//                 })}
//             </Grid2>
//           )}

//           {/* Pagination */}
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//             <Pagination
//               count={totalPages} // Total number of pages
//               page={page + 1} // 1-based index for MUI pagination
//               onChange={(event, value) => setPage(value - 1)} // Update page state (adjusted for 0-based)
//               color="primary"
//               shape="rounded"
//             />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default History;


import History from "./component/historyComponent";
export default History;