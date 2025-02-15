import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../api";
import NavComponent from "../components/nav";
import { HOST } from "../../../utils/constants";
import { useAppStore } from "../../../store";

const Nav = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const ProfileImage = userInfo.profilePic ? `${HOST}/${userInfo.profilePic.replace(/^\/+/, "")}` : "";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    toast.loading("Logging out...", { autoClose: 1000 });
    try {
      const success = await logoutUser();
      if (success) {
        toast.dismiss();
        toast.success("Successfully logged out!", { autoClose: 1000 });
        setUserInfo(null);
        localStorage.removeItem("app-storage");
        navigate("/auth");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message, { autoClose: 1000 });
    }
  };

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <NavComponent
      userInfo={userInfo}
      ProfileImage={ProfileImage}
      anchorEl={anchorEl}
      mobileOpen={mobileOpen}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
      handleLogout={handleLogout}
      toggleDrawer={toggleDrawer}
    />
  );
};

export default Nav;
