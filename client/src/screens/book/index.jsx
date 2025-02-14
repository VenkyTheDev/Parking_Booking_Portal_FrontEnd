// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Divider,
//   TextField,
//   MenuItem,
//   CircularProgress,
// } from "@mui/material";
// import {
//   LocalizationProvider,
//   DatePicker,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import Grid2 from "@mui/material/Grid2";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import Nav from "../nav";
// import { useAppStore } from "../../store";
// import { apiClient } from "../../lib/api-client";
// import { BOOKING_ROUTE, NEAREST_SLOT } from "../../utils/constants";
// import { toast } from "react-toastify";
// import bgImage from "/bgImg.jpg";

// const Book = () => {
//   const { userInfo } = useAppStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const parkingData = location.state || {};

//   // State Variables
//   const [parkingId, setParkingId] = useState(parkingData.parkingId || "");
//   const [startDate, setStartDate] = useState(dayjs());
//   const [startTime, setStartTime] = useState(dayjs());
//   const [endDate, setEndDate] = useState(dayjs());
//   const [endTime, setEndTime] = useState(dayjs());
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [locationText, setLocationText] = useState("Fetching location...");
//   const [loadingLocation, setLoadingLocation] = useState(true);

//   // Automatically fetch user's location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           setLocationText(
//             `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
//           );
//           setLoadingLocation(false);
//           toast.dismiss();
//           toast.success("Location retrieved successfully.", {
//             autoClose: 1000,
//           });
//         },
//         () => {
//           toast.error("Could not retrieve location.", {
//             autoClose: 1000,
//           });
//           setLoadingLocation(false);
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.", {
//         autoClose: 1000,
//       });
//       setLoadingLocation(false);
//     }
//   }, []);

//   // Handle booking submission
//   const handleBooking = async () => {
//     if (!parkingId || !endTime || latitude === "" || longitude === "") {
//       toast.warn("Please fill in all fields.", {
//         autoClose: 1000,
//       });
//       return;
//     }

//     const formatToLocalDateTime = (dateTime) => {
//       return dayjs(dateTime).format("YYYY-MM-DDTHH:mm:ss");
//     };

//     let startTimeFormatted = formatToLocalDateTime(
//       dayjs(startDate).hour(startTime.hour()).minute(startTime.minute())
//     );

//     let endTimeFormatted = formatToLocalDateTime(
//       dayjs(endDate).hour(endTime.hour()).minute(endTime.minute())
//     );

//     if (dayjs(endTimeFormatted).isBefore(startTimeFormatted)) {
//       toast.warn("End time must be after the start time.", {
//         autoClose: 1000,
//       });
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         BOOKING_ROUTE,
//         {
//           userId: userInfo.id,
//           parkingId,
//           startTime: startTimeFormatted,
//           endTime: endTimeFormatted,
//           latitude,
//           longitude,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       console.log("This is the response of book page", response);

//       if (response.data.statusCode === 400) {
//         toast.error(response.data.errorMessage);
//       }
//       if (response.data.errorMessage == "No available slots!") {
//         const nearestSlot = await apiClient.post(NEAREST_SLOT, {
//           parkingId: parkingId,
//           startTime: startTimeFormatted,
//           endTime: endTimeFormatted,
//         });
//         const formattedDate = nearestSlot.data.replace("T", " ");

//         // Convert the formatted string to a JavaScript Date object
//         const nearestSlotdata = new Date(formattedDate);
//         console.log("This is the nearestSlot", nearestSlotdata);
//         toast.info("The nearest availble lsot is at " + nearestSlotdata, {
//           autoClose: 5000,
//         });
//       } else {
//         toast.success("Booking successful!");
//         navigate("/home");
//       }
//     } catch (error) {
//       toast.error("Failed to book parking.", {
//         autoClose: 1000,
//       });
//       navigate("/home");
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           p: 4,
//         }}
//       >
//         <Grid2 container spacing={3} justifyContent="center">
//           <Grid2 xs={12} md={6}>
//             <Card
//               sx={{ p: 3, boxShadow: 10, borderRadius: 4, textAlign: "center" }}
//             >
//               <CardContent>
//                 <Typography variant="h4" fontWeight="bold">
//                   🚗 Confirm Your Booking
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />

//                 <Stack spacing={3}>
//                   <TextField
//                     select
//                     label="Select Parking Spot"
//                     fullWidth
//                     value={parkingId}
//                     onChange={(e) => setParkingId(e.target.value)}
//                     sx={{ my: 2 }}
//                     disabled={!!parkingData.parkingId}
//                   >
//                     <MenuItem value={parkingId}>
//                       {parkingData.parkingName || "Select"}
//                     </MenuItem>
//                   </TextField>

//                   {userInfo.role === "ADMIN" && (
//                     <>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <Stack spacing={3}>
//                           <DatePicker
//                             label="Start Date"
//                             value={startDate}
//                             onChange={setStartDate}
//                             renderInput={(params) => <TextField {...params} />}
//                             minDate={dayjs()}
//                           />
//                           <TimePicker
//                             label="Start Time"
//                             value={startTime}
//                             onChange={setStartTime}
//                             minutesStep={1}
//                             renderInput={(params) => <TextField {...params} />}
//                           />
//                           <DatePicker
//                             label="End Date"
//                             value={endDate}
//                             onChange={setEndDate}
//                             renderInput={(params) => <TextField {...params} />}
//                             minDate={dayjs()}
//                           />
//                         </Stack>
//                       </LocalizationProvider>
//                     </>
//                   )}

//                   {/* End Time */}
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Stack spacing={2}>
//                       {userInfo.role === "USER" && (
//                         <>
//                           <DatePicker
//                             label="Date"
//                             value={startDate}
//                             onChange={setStartDate}
//                             renderInput={(params) => <TextField {...params} />}
//                             minDate={dayjs()}
//                             disabled={true}
//                           />
//                         </>
//                       )}
//                       <TimePicker
//                         label="End Time"
//                         value={endTime}
//                         onChange={setEndTime}
//                         minutesStep={1}
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Stack>
//                   </LocalizationProvider>

//                   <Typography variant="body1" sx={{ my: 2 }}>
//                     {loadingLocation ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : (
//                       `Location: ${locationText}`
//                     )}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     startIcon={<EventAvailableIcon />}
//                     onClick={handleBooking}
//                     sx={{ my: 2 }}
//                     disabled={loadingLocation}
//                   >
//                     {loadingLocation ? "Fetching Location..." : "Book a Slot"}
//                   </Button>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid2>
//         </Grid2>
//       </Box>
//     </>
//   );
// };

// export default Book;


import Book from "./containers/book";
export default Book;