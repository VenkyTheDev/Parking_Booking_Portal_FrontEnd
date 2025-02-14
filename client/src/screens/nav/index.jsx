import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  Home,
  Info,
  Book,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppStore } from "../../store";
import { HOST, LOGOUT_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import image from "/ongridlogowhite.png";

const Nav = () => {
  const { userInfo, setUserInfo } = useAppStore(); // Zustand state
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ProfileImage = `${HOST}/${userInfo.profilePic?.replace(/^\/+/, "")}`;

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    toast.loading("Logging out...", {
      autoClose: 1000,
    });
    try {
      await apiClient.post(LOGOUT_ROUTE);
      toast.dismiss();
      toast.success("Successfully logged out!", {
        autoClose: 1000,
      });
      setUserInfo(null);
      localStorage.removeItem("app-storage");
      navigate("/auth");
    } catch (error) {
      toast.dismiss();
      toast.error("Logout failed. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  console.log("This is the UserInfo from the nav", userInfo);

  return (
    <AppBar
      position="fixed"
      sx={{
        // background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        background : "#33CCCC",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: 1,
            background: "-webkit-linear-gradient(45deg, #00d4ff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            {/* {userInfo.organisation.name} */}{" "}
            {/* Use the Organisation logo for further */}
            <img src={image} alt="My Image" width={100} height={100} />
          </NavLink>
        </Typography>

        {userInfo.role === "ADMIN" && (
          <Box sx={{ flexGrow: 2, textAlign: "center" }}>
            <Typography
              variant="h6" // A subtle font size
              color="primary" // Elegant primary color from the theme
              fontWeight="normal" // Normal weight for a balanced look
              sx={{
                textTransform: "uppercase", // Keeps the uppercase look but subtle
                fontFamily: "'Lora', serif", // Elegant serif font
                letterSpacing: "1.5px", // A little letter spacing for refinement
                fontSize: "1.5rem", // Adjust font size to be slightly bigger but still subtle
                lineHeight: 1.6, // Adds some breathing room for readability
                opacity: 0.9, // Slight opacity for a more delicate effect
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)", // A very subtle shadow for depth
              }}
            >
              ADMIN
            </Typography>
          </Box>
        )}

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            component={NavLink}
            to="/home"
          >
            Home
          </Button>
          {userInfo?.role == "ADMIN" && (
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              component={NavLink}
              to="/actions"
            >
              Actions
            </Button>
          )}
          <Button
            color="inherit"
            startIcon={<Book />}
            component={NavLink}
            to="/history"
          >
            My Bookings
          </Button>
          <Button
            color="inherit"
            startIcon={<Info />}
            component={NavLink}
            to="/about"
          >
            About
          </Button>
        </Box>

        {/* User Avatar Dropdown */}
        {userInfo ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
              <Avatar src={ProfileImage} sx={{ bgcolor: "#ff7043" }}>
                {!userInfo.profilePic && userInfo.name?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
            >
              <MenuItem
                component={NavLink}
                to="/profile"
                onClick={handleMenuClose}
              >
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1, color: "red" }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={NavLink} to="/auth">
            Login
          </Button>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <List
          sx={{
            width: 250,
            background: "#16213e",
            height: "100%",
            color: "white",
          }}
        >
          <ListItem
            button
            component={NavLink}
            to="/home"
            onClick={toggleDrawer(false)}
          >
            <Home sx={{ color: "#00d4ff", mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          {userInfo?.role == "ADMIN" && (
            <ListItem
              button
              component={NavLink}
              to="/actions"
              onClick={toggleDrawer(false)}
            >
              <AccountCircle sx={{ color: "#ffcc00", mr: 1 }} />
              <ListItemText primary="Actions" />
            </ListItem>
          )}
          <ListItem
            button
            component={NavLink}
            to="/history"
            onClick={toggleDrawer(false)}
          >
            <Book sx={{ color: "#ff00ff", mr: 1 }} />
            <ListItemText primary="My Bookings" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/about"
            onClick={toggleDrawer(false)}
          >
            <Info sx={{ color: "#00ff99", mr: 1 }} />
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
