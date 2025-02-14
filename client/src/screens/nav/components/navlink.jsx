import React from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, Book, Info, AccountCircle } from "@mui/icons-material";

const NavLinks = ({ userInfo, isMobile, toggleDrawer }) => {
  const links = [
    { to: "/home", label: "Home", icon: <Home sx={{ mr: 1 }} /> },
    userInfo?.role === "ADMIN" && {
      to: "/actions",
      label: "Actions",
      icon: <AccountCircle sx={{ mr: 1 }} />,
    },
    { to: "/history", label: "My Bookings", icon: <Book sx={{ mr: 1 }} /> },
    { to: "/about", label: "About", icon: <Info sx={{ mr: 1 }} /> },
  ].filter(Boolean);

  if (isMobile) {
    return (
      <List sx={{ width: 250, background: "#16213e", height: "100%", color: "white" }}>
        {links.map(({ to, label, icon }, index) => (
          <ListItem button component={NavLink} to={to} key={index} onClick={toggleDrawer(false)}>
            {icon}
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
      {links.map(({ to, label, icon }, index) => (
        <Button color="inherit" startIcon={icon} component={NavLink} to={to} key={index}>
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
