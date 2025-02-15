import React, { useRef } from "react";
import {
  Avatar,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Box,
  Card,
} from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ProfileForm = ({
  name,
  setName,
  contactNumber,
  setContactNumber,
  department,
  setDepartment,
  image,
  handleFileInputClick,
  handleImageChange,
  handleDeleteImage,
  handleSaveChanges,
  navigate,
  userInfo,
  fileInputRef,
}) => {
  return (
    <Card
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        color: "#fff",
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
        backdropFilter: "blur(5px)",
      }}
    >
      <IconButton onClick={() => navigate(-1)} sx={{ color: "#fff", position: "absolute", top: 10, left: 10 }}>
        <IoArrowBack size={28} />
      </IconButton>

      <Tooltip title={image ? "Remove Image" : "Add Image"} arrow>
        <IconButton onClick={image ? handleDeleteImage : handleFileInputClick} sx={{ position: "relative", mt: 2 }}>
          <Avatar src={image} sx={{ width: 120, height: 120, border: "2px solid #fff" }}>
            {!image && (name ? name.charAt(0) : userInfo.email.charAt(0))}
          </Avatar>
          {image ? <FaTrash size={22} style={{ position: "absolute", bottom: 0, right: 0, color: "red" }} /> : 
            <FaPlus size={22} style={{ position: "absolute", bottom: 0, right: 0, color: "white" }} />}
        </IconButton>
      </Tooltip>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />

      <TextField fullWidth label="Email" value={userInfo.email} disabled sx={{ mt: 2 }} />
      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 2 }} />
      <TextField fullWidth label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} sx={{ mt: 2 }} />
      <TextField fullWidth label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} sx={{ mt: 2 }} />

      <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ mt: 3, width: "100%" }}>
        Save Changes
      </Button>
    </Card>
  );
};

export default ProfileForm;
