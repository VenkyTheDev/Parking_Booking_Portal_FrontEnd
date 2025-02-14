import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image from "/ongridlogowhite.png";
import NavLinks from "../components/navlink";
import UserMenu from "../components/usermenu";
import { useAppStore } from "../../../store";
import { HOST, LOGOUT_ROUTE } from "../../../utils/constants";
import { apiClient } from "../../../lib/api-client";

const Nav = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const ProfileImage = `${HOST}/${userInfo.profilePic?.replace(/^\/+/, "")}`;
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.loading("Logging out...", { autoClose: 1000 });
    try {
      await apiClient.post(LOGOUT_ROUTE);
      toast.dismiss();
      toast.success("Successfully logged out!", { autoClose: 1000 });
      setUserInfo(null);
      localStorage.removeItem("app-storage");
      navigate("/auth");
    } catch {
      toast.dismiss();
      toast.error("Logout failed. Please try again.", { autoClose: 1000 });
    }
  };

  const toggleDrawer = (open) => () => setMobileOpen(open);

  return (
    <AppBar position="fixed" sx={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}>
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { md: "none" } }}>
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
            <img src={image} alt="Logo" width={100} height={100} />
          </NavLink>
        </Typography>

        {/* Admin Badge */}
        {userInfo.role === "ADMIN" && (
          <Box sx={{ flexGrow: 2, textAlign: "center" }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="normal"
              sx={{
                textTransform: "uppercase",
                fontFamily: "'Lora', serif",
                letterSpacing: "1.5px",
                fontSize: "1.5rem",
                opacity: 0.9,
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              ADMIN
            </Typography>
          </Box>
        )}

        {/* Desktop Navigation */}
        <NavLinks userInfo={userInfo} isMobile={false} />

        {/* User Avatar or Login Button */}
        {userInfo ? <UserMenu userInfo={userInfo} ProfileImage={ProfileImage} handleLogout={handleLogout} /> : (
          <Button color="inherit" component={NavLink} to="/auth">Login</Button>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <NavLinks userInfo={userInfo} isMobile={true} toggleDrawer={toggleDrawer} />
      </Drawer>
    </AppBar>
  );
};

export default Nav;
