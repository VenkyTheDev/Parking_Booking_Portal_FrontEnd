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
} from "@mui/material";

const UserTable = ({ users, handleFlagClick, loading, selectedUser }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ bgcolor: "#1976D2" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={user.id} sx={{ "&:nth-of-type(odd)": { bgcolor: "#F3F4F6" } }}>
                <TableCell>{index + 1}</TableCell>
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
