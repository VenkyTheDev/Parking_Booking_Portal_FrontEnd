// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import Nav from "../nav";
// import bgImage from "/bgImg.jpg";
// import { apiClient } from "../../lib/api-client";
// import { GET_ACTIVE_BOOKING, RESCHEDULE_BOOKING, CANCEL_BOOKING } from "../../utils/constants";
// import { useAppStore } from "../../store";  // Assuming you have a store that holds user info.

// const Home = () => {
//   const navigate = useNavigate();
//   const { userInfo } = useAppStore(); // Get user info, assuming it includes a role (e.g. 'admin')
//   const [activeBookings, setActiveBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Dialogs states
//   const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
//   const [openCancelDialog, setOpenCancelDialog] = useState(false);
//   const [newEndTime, setNewEndTime] = useState("");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   useEffect(() => {
//     const fetchActiveBookings = async () => {
//       try {
//         const result = await apiClient.get(GET_ACTIVE_BOOKING, {
//           withCredentials: true,
//         });
//         setActiveBookings(result.data);
//       } catch (err) {
//         setError("Failed to fetch active bookings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActiveBookings();
//   }, []);

//   const handleRescheduleClick = (booking) => {
//     setSelectedBooking(booking);
//     setOpenRescheduleDialog(true);
//   };

//   const handleCancelClick = (booking) => {
//     setSelectedBooking(booking);
//     setOpenCancelDialog(true);
//   };

//   const handleRescheduleClose = () => {
//     setOpenRescheduleDialog(false);
//   };

//   const handleCancelClose = () => {
//     setOpenCancelDialog(false);
//   };

//   const handleRescheduleConfirm = async () => {
//     try {
//       // Get the current date (in yyyy-MM-dd format)
//       const currentDate = new Date(selectedBooking.endTime);
//       const formattedDate = currentDate.toISOString().split('T')[0]; // Get only the date in yyyy-MM-dd format
      
//       // Combine the current date with the new time
//       const newDateTime = `${formattedDate}T${newEndTime}:00`; // Assuming newEndTime is in HH:mm format
      
//       // Now call the API with the correctly formatted new end time
//       await apiClient.post(RESCHEDULE_BOOKING, {
//         userId : userInfo.id,
//         bookingId: selectedBooking.bookingId,
//         newEndTime: newDateTime, // Send the correctly formatted datetime string
//       });
  
//       setOpenRescheduleDialog(false); // Close the dialog
//       // Optionally, refetch the bookings to reflect changes
//       setActiveBookings(activeBookings.map((booking) =>
//         booking.bookingId === selectedBooking.bookingId
//           ? { ...booking, endTime: newDateTime }
//           : booking
//       ));
//       navigate("/home");
//     } catch (err) {
//       navigate("/home");
//       setError("Failed to reschedule booking.");
//     }
//   };
  

//   const handleCancelConfirm = async () => {
//     try {
//       await apiClient.post(`${CANCEL_BOOKING}/${userInfo.id}`, 
//         selectedBooking.bookingId
//       );
//       setOpenCancelDialog(false); // Close the dialog
//       // Optionally, remove the canceled booking from the list
//       setActiveBookings(activeBookings.filter(
//         (booking) => booking.bookingId !== selectedBooking.bookingId
//       ));
//     } catch (err) {
//       setError("Failed to cancel booking.");
//     }
//   };

//   // Check if user has active booking and if they are not an admin
//   const hasActiveBooking = activeBookings.length > 0;
//   const isNotAdmin = userInfo.role !== 'ADMIN';

//   return (
//     <>
//       <Nav />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center",
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           color: "white",
//           mb: "0px",
//           p: 3,
//         }}
//       >
//         <Container sx={{ textAlign: "center" }}>
//   {userInfo.allowedAfter > Date.now() && (
//     <Typography 
//       variant="body2" 
//       sx={{ 
//         fontSize: "1rem", // Smaller text size
//         opacity: 0.8, 
//         marginBottom: 2, // Add some spacing between the message and other elements
//         color: "beige", // You can adjust the color based on your theme (e.g., a warning color)
//         textAlign: "center", // Center the message on all screens
//         maxWidth: "500px", // Ensure the message doesn't stretch too wide
//         marginX: "auto", // Center align horizontally
//       }}
//     >
//       You are not allowed to book till {new Date(userInfo.allowedAfter).toLocaleString()}
//     </Typography>
//   )}

//   <Typography variant="h2" fontWeight="bold" color="beige" gutterBottom>
//     Hassle-Free Parking Just for You!
//   </Typography>

//   {/* Display the user's name */}
//   <Typography variant="h5" sx={{ mb: 3, color: "white", textShadow: "4px 4px 12px rgba(0, 188, 212, 0.9)" }}>
//   Welcome, {userInfo.name}!
// </Typography>



//   <Typography variant="h5" sx={{ opacity: 1, mb: 3 , textShadow: "4px 4px 12px rgba(0, 188, 212, 0.9)" }}>
//     Find, book, and manage your parking spots with ease.
//   </Typography>

//   <Button
//     variant="contained"
//     size="large"
//     sx={{
//       fontSize: "1.2rem",
//       px: 4,
//       py: 1.5,
//       borderRadius: "30px",
//       backgroundColor: hasActiveBooking && isNotAdmin ? 'rgba(0, 188, 212, 0.9)' : 'primary.main', // Set the background color conditionally
//       '&:hover': {
//         backgroundColor: hasActiveBooking && isNotAdmin ? 'grey' : 'primary.dark', // Hover effect
//       },
//     }}
//     onClick={() => navigate("/parkings")}
//     disabled={hasActiveBooking && isNotAdmin || userInfo.allowedAfter > Date.now()} // Disable the button if the user is flagged
//   >
//     Book a Spot
//   </Button>
// </Container>



//         {/* Active Bookings Section */}
//         <Box
//           sx={{
//             mt: 5,
//             width: "80%",
//             background: "rgba(255, 255, 255, 0.2)",
//             backdropFilter: "blur(10px)",
//             borderRadius: "15px",
//             p: 3,
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Active Bookings
//           </Typography>
//           {loading ? (
//             <CircularProgress sx={{ color: "#fff" }} />
//           ) : error ? (
//             <Alert severity="error">{error}</Alert>
//           ) : activeBookings.length === 0 ? (
//             <Alert severity="info">No active bookings.</Alert>
//           ) : (
//             activeBookings.map((booking) => (
//               <Card key={booking.bookingId} sx={{ mb: 2, background: "#ffffff" }}>
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {booking.bookingId}
//                   </Typography>
//                   <Typography variant="body2">
//                     📅 Start Time:{" "}
//                     {new Date(booking.startTime).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body2">
//                     📅 End Time: {new Date(booking.endTime).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body2">
//                     ⏳ Duration:{" "}
//                     {Math.floor(
//                       (new Date(booking.endTime) -
//                         new Date(booking.startTime)) /
//                         (1000 * 60 * 60)
//                     )}
//                     h
//                   </Typography>
//                   {/* Reschedule and Cancel Buttons */}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleRescheduleClick(booking)}
//                     sx={{ mt: 2, mr: 2 }}
//                   >
//                     Reschedule
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleCancelClick(booking)}
//                     sx={{ mt: 2 }}
//                   >
//                     Cancel
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </Box>
//       </Box>

//       {/* Reschedule Dialog */}
//       <Dialog open={openRescheduleDialog} onClose={handleRescheduleClose}>
//         <DialogTitle>Reschedule Booking</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="New End Time"
//             type="time"
//             fullWidth
//             value={newEndTime}
//             onChange={(e) => setNewEndTime(e.target.value)}
//             sx={{ mt: 2 }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             inputProps={{
//               step: 300, // 5 minutes intervals
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleRescheduleClose}>Cancel</Button>
//           <Button onClick={handleRescheduleConfirm}>Confirm</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cancel Confirmation Dialog */}
//       <Dialog open={openCancelDialog} onClose={handleCancelClose}>
//         <DialogTitle>Are you sure?</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to cancel this booking? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelClose}>No</Button>
//           <Button onClick={handleCancelConfirm} color="error">
//             Yes, Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Home;

import Home from "./container/home";
export default Home;