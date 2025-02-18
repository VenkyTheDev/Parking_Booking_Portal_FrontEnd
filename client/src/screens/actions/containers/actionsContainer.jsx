import React, { useState, useEffect } from "react";
import { Box, Typography, Alert } from "@mui/material";
import bgImage from "/bgImg.jpg";
import Nav from "../../nav";
import { useAppStore } from "../../../store";
import FlagDialog from "../components/fileDialog";
import UserTable from "../components/userTable";
import SearchBar from "../components/searchBar";
import { flagUser, getAllProfiles } from "../api";
import { BACKGROUND_THEME } from "../../../utils/constants";

const ActionsContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [flagDays, setFlagDays] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { userInfo } = useAppStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllProfiles(userInfo.role);
        setUsers(response);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFlagClick = (user) => {
    setSelectedUser(user);
    if (user.allowedAfter > Date.now()) {
      toggleFlag(user.id, 0);
    } else {
      setOpenDialog(true);
    }
  };

  const toggleFlag = async (userId, days) => {
    setLoading(true);
    try {
      await flagUser(userId, days);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, allowedAfter: days > 0 ? Date.now() + days * 86400000 : 0 }
            : user
        )
      );
    } catch (err) {
      setError("Failed to update flag status.");
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setFlagDays("");
    }
  };

  const handleDialogConfirm = () => {
    if (flagDays && !isNaN(flagDays) && flagDays > 0) {
      toggleFlag(selectedUser.id, parseInt(flagDays, 10));
    }
  };

  const filteredUsers = users
    .filter((user) => user.role !== "ADMIN")
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Nav/> {/* backgroundImage: `url(${bgImage})` */}
      <Box sx={{ p: 3, width: "100%", mx: "auto", backgroundColor : `${BACKGROUND_THEME}` , minHeight: "100vh" , backgroundSize: "cover",}}>
        <Box sx={{ p: 3, borderRadius: "15px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Manage Users
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <UserTable users={filteredUsers} handleFlagClick={handleFlagClick} loading={loading} selectedUser={selectedUser} />
        </Box>
      </Box>
      <FlagDialog open={openDialog} flagDays={flagDays} setFlagDays={setFlagDays} onClose={() => setOpenDialog(false)} onConfirm={handleDialogConfirm} />
    </>
  );
};

export default ActionsContainer;
