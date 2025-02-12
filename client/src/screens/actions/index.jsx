import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Box,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { MdSearch } from 'react-icons/md';
import Nav from "../nav";
import { useAppStore } from "../../store";
import { apiClient } from "../../lib/api-client";
import { FLAG_USER, GET_ALL_PROFILES } from "../../utils/constants";
import bgImage from "/bgImg.jpg";

const Actions = () => {
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
      try {
        setLoading(true);
        const response = await apiClient.post(
          GET_ALL_PROFILES,
          { role: userInfo.role },
          { withCredentials: true }
        );
        setUsers(response.data);
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

  // const toggleFlag = async (userId, days) => {
  //   try {
  //     setLoading(true);
  //     const response = await apiClient.post(`${FLAG_USER}/${userId}`, days);
  //     console.log("This is the response of flag", response);
  //     if (response.status === 200) {
  //       setUsers((prevUsers) =>
  //         prevUsers.map((user) =>
  //           user.id === userId
  //             ? {
  //                 ...user,
  //                 allowedAfter: days > 0 ? Date.now() + days * 86400000 : 0,
  //               }
  //             : user
  //         )
  //       );
  //     }
  //   } catch (err) {
  //     setError("Failed to update flag status.");
  //   } finally {
  //     setLoading(false);
  //     setOpenDialog(false);
  //     setFlagDays("");
  //   }
  // };

  const toggleFlag = async (userId, days) => {
    try {
      setLoading(true);
      const response = await apiClient.post(`${FLAG_USER}/${userId}`,  days ); // Ensure correct payload
      console.log("Flag API Response:", response);
  
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, allowedAfter: days > 0 ? Date.now() + days * 86400000 : 0 }
              : user
          )
        );
      }
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
      <Nav />
      <Box
        sx={{
          p: 3,
          width: "100%",
          mx: "auto",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
            backdropFilter: "blur(5px)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Manage Users
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <TextField
              label="Search by Name or Email"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 400 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    < MdSearch/>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#1976D2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    S.No
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:nth-of-type(odd)": { bgcolor: "#F3F4F6" } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={
                            user.allowedAfter > Date.now() ? "success" : "error"
                          }
                          onClick={() => handleFlagClick(user)}
                          disabled={loading}
                        >
                          {loading && selectedUser?.id === user.id ? (
                            <CircularProgress size={20} />
                          ) : user.allowedAfter > Date.now() ? (
                            "Unflag"
                          ) : (
                            "Flag"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Number of Days to Flag</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            value={flagDays}
            onChange={(e) => setFlagDays(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
