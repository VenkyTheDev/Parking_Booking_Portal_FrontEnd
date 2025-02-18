import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import bgImage from "/bgImg.jpg";
import { aboutDetails } from "../containers/aboutData.js";
import FaqItem from "../components/faqItems.jsx";
import Nav from "../../nav";
import { BACKGROUND_THEME } from "../../../utils/constants";

const About = () => {
  return (
    <>
      <Nav />
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundImage: `url(${bgImage})`,
          backgroundColor : `${BACKGROUND_THEME}`,
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
            bgcolor: "rgba(255, 255, 255, 0.45)",
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
            <FaqItem key={index} title={item.title} description={item.description} />
          ))}
        </Paper>
      </Container>
    </>
  );
};

export default About;