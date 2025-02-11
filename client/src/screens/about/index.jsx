import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Nav from "../nav";
import bgImage from "/bgImg.jpg";

// About details
const aboutDetails = [
  {
    title: "What is the Parking Portal?",
    description:
      "The Parking Portal is a web-based solution designed to help organizations manage parking slot bookings efficiently. Users can book, cancel, and reschedule parking slots with ease. Admins have additional privileges to manage all bookings and regulate user access.",
  },
  {
    title: "Who can use this portal?",
    description:
      "The portal is designed for employees and admins of registered organizations. Normal users can book one slot at a time, while admins have extended privileges such as pre-booking, managing user flags, and overseeing all bookings.",
  },
  {
    title: "How does booking work?",
    description:
      "Users must be within a certain range from the parking lot to book a slot (admins are exempt from this restriction). Once booked, users can cancel or reschedule as needed.",
  },
  {
    title: "What happens if I enter without a valid booking?",
    description:
      "Unauthorized entry results in flagging, which prevents further bookings until restrictions are lifted by an admin.",
  },
  {
    title: "Can admins manage users?",
    description:
      "Yes. Admins can promote users to admin status, flag/unflag users, and manage all past and current bookings.",
  },
];

const About = () => {
  return (
    <>
      <Nav />
      <Container
        maxWidth={false} // Allow full width
        sx={{
          minHeight: "100vh", // Full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: "md",
            bgcolor: "rgba(255, 255, 255, 0.45)", // Slight transparency for better readability
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
            About Parking Portal
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 2 }}>
            Learn more about how our parking portal helps organizations streamline parking slot management.
          </Typography>
          {aboutDetails.map((item, index) => (
            <Accordion key={index} sx={{ my: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </>
  );
};

export default About;
