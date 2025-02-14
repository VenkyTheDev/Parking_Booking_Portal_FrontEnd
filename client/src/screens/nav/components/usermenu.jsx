import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Divider } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const UserMenu = ({ userInfo, ProfileImage, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
        <Avatar src={ProfileImage} sx={{ bgcolor: "#ff7043" }}>
          {!userInfo.profilePic && userInfo.name?.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
        <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
          <AccountCircle sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1, color: "red" }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
