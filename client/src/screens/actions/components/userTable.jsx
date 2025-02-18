import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { HOST } from "../../../utils/constants";

const UserTable = ({ users, handleFlagClick, loading, selectedUser }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead sx={{ bgcolor: "#1976D2" }}>
          <TableRow sx={{ bgcolor: "#1976D2" }}>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", bgcolor: "#1976D2" }}
            >
              S.No
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", bgcolor: "#1976D2" }}
            >
              Profile 
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", bgcolor: "#1976D2" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", bgcolor: "#1976D2" }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", bgcolor: "#1976D2" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:nth-of-type(odd)": { bgcolor: "#F3F4F6" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                <Avatar src={`${HOST}${user.profilePic}`} sx={{ bgcolor: "#ff7043" }}>
                  {!user.profilePic && user.name?.charAt(0)}
                </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.allowedAfter > Date.now() ? "success" : "error"}
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
  );
};

export default UserTable;
