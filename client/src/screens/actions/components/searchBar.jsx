import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
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
              <MdSearch />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
