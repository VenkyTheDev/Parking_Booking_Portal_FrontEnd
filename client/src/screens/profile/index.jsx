import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
  HOST,
} from "../../utils/constants";
import Nav from "../nav";
import { useAppStore } from "../../store";
import { apiClient } from "../../lib/api-client";
// import { colors, getColor } from "../../lib/utils";
import bgImage from "/bgImg.jpg";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
  "image/heif",
  "image/heic"
];

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [department, setDepartment] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.name) {
      setName(userInfo.name);
    }
    if (userInfo.profilePic) {
      setImage(`${HOST}/${userInfo.profilePic.replace(/^\/+/, "")}`);
    }
    setContactNumber(userInfo.contactNumber || "");
    setDepartment(userInfo.department || "");
    setSelectedColor(userInfo.color || 0);
  }, [userInfo]);

  const validateProfile = () => {
    if (!name) {
      toast.error("Name is required",{
        autoClose:1000
      });
      return false;
    }
    if (!contactNumber) {
      toast.error("Contact number is required",{
        autoClose:1000
      });
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (!validateProfile()) return;
    try {
      const updateData = {
        name,
        contactNumber,
        department,
      };
      console.log("Entering the update profile route");
      console.log("Printing User Info", userInfo);
      const response = await apiClient.put(
        `${UPDATE_PROFILE_ROUTE}/${userInfo.id}`,
        updateData,
        {
          withCredentials: true,
        }
      );
      console.log("This response is from the update profile", response);
      if (response.status === 202 && response.data) {
        setUserInfo({ ...response.data });
        toast.success("Profile Updated Successfully",{
          autoClose:1000
        });
        navigate("/sample");
      }
    } catch (error) {
      toast.error("Failed to update profile",{
        autoClose:1000
      });
    }
  };

  const handleFileInputClick = () => fileInputRef.current.click();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file format. Use PNG, JPG, SVG, or WEBP.",{
        autoClose:1000
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Maximum allowed is 5MB.",{
        autoClose:1000
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userInfo.id);

    try {
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("This is the adding profile response" , response);
    
      if (response.status === 200 && response.data.profilePic) {
        const imageUrl = `${HOST}/${response.data.profilePic.replace(
          /^\/+/,
          ""
        )}`;
    
        // Update state without modifying other properties of userInfo
        setUserInfo({ ...response.data });
        // setUserInfo((prev) => {
        //   const updatedUserInfo = { ...prev, profilePic: response.data.profilePic };
    
        //   // Update localStorage with the modified profilePic
        //   localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        //   setImage(imageUrl);
    
        //   return updatedUserInfo;
        // });
    
        setImage(imageUrl);
        toast.success("Image Updated Successfully",{
          autoClose:1000
        });
      }
    } catch (error) {
      toast.error("Failed to update image",{
        autoClose:1000
      });
    }
    
  };

  const handleDeleteImage = async () => {
    try {
      const userId = userInfo?.id;
      
      if (!userId) {
        toast.error("User ID not found", {
          autoClose: 1000,
        });
        return;
      }
  
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        params: { userId },
      });
  
      console.log("This is the response of the delete image", response);
  
      if (response.status === 202) {
        // Update the profilePic to null in state
        
        setUserInfo({ ...response.data });
  
        // Optionally reset image preview
        setImage(null);
  
        // Update profilePic in local storage
        const updatedUserInfo = { ...userInfo, profilePic: null };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  
        toast.success("Profile image removed successfully", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Failed to remove image", {
        autoClose: 1000,
      });
    }
  };
  
  
  
  

  return (
    <>
    <Nav />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      <Card
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))", // glossy semi-transparent effect
          backdropFilter: "blur(5px)", // Applying blur to enhance glossiness
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "#fff", position: "absolute", top: 10, left: 10 }}
        >
          <IoArrowBack size={28} />
        </IconButton>

        <Tooltip title={image ? "Remove Image" : "Add Image"} arrow>
          <IconButton
            onClick={image ? handleDeleteImage : handleFileInputClick}
            sx={{
              position: "relative",
              mt: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Avatar
              src={image}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                border: "2px solid #fff",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              {!image &&
                (name
                  ? name.charAt(0)
                  : userInfo.email && typeof userInfo.email === "string"
                  ? userInfo.email.charAt(0)
                  : "")}
            </Avatar>
            {image ? (
              <FaTrash
                size={22}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "red",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  padding: 4,
                }}
              />
            ) : (
              <FaPlus
                size={22}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  padding: 4,
                }}
              />
            )}
          </IconButton>
        </Tooltip>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept={ALLOWED_TYPES.join(", ")}
        />

        <TextField
          fullWidth
          label="Email"
          value={userInfo.email}
          disabled
          variant="outlined"
          sx={{
            mt: 2.5, // Adjusted for a subtle gap between fields
            bgcolor: "#2b2f39", // Dark background for the textfield
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#2b2f39", // Same background color for input text area
              "&:hover": {
                backgroundColor: "#3d434c", // Slightly lighter background on hover
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444", // Default border color
                borderWidth: 1,
                transition: "all 0.3s ease", // Smooth transition for border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bfff", // Neon blue border on focus
                borderWidth: 2, // Make border thicker when focused
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.6)", // Subtle neon glow effect
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bbb", // Default label color
              transition: "all 0.3s ease", // Smooth transition for label
              fontWeight: 500, // Default font weight for label
              "&.Mui-focused": {
                color: "#00bfff", // Neon blue label when focused
                transform: "translate(0, -18px) scale(0.75)", // Move label up with slight scaling
                letterSpacing: "1px", // Slightly spaced out text for a clean look
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff", // White text color for input
              fontWeight: 500, // Slightly less bold than the label
              "&:focus": {
                color: "#fff", // Keep text white when focused
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{
            mt: 2.5, // Adjusted gap between text fields
            bgcolor: "#2b2f39",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#2b2f39",
              "&:hover": {
                backgroundColor: "#3d434c",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
                borderWidth: 1,
                transition: "all 0.3s ease",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bfff",
                borderWidth: 2,
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.6)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
              transition: "all 0.3s ease",
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#00bfff",
                transform: "translate(0, -18px) scale(0.75)",
                letterSpacing: "1px",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff",
              fontWeight: 500,
              "&:focus": {
                color: "#fff",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Contact Number"
          value={contactNumber || ""}
          onChange={(e) => setContactNumber(e.target.value)}
          variant="outlined"
          sx={{
            mt: 2.5, // Consistent gap across all fields
            bgcolor: "#2b2f39",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#2b2f39",
              "&:hover": {
                backgroundColor: "#3d434c",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
                borderWidth: 1,
                transition: "all 0.3s ease",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bfff",
                borderWidth: 2,
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.6)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
              transition: "all 0.3s ease",
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#00bfff",
                transform: "translate(0, -18px) scale(0.75)",
                letterSpacing: "1px",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff",
              fontWeight: 500,
              "&:focus": {
                color: "#fff",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Department"
          value={department || ""}
          onChange={(e) => setDepartment(e.target.value)}
          variant="outlined"
          sx={{
            mt: 2.5, // Uniform gap between all text fields
            bgcolor: "#2b2f39",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#2b2f39",
              "&:hover": {
                backgroundColor: "#3d434c",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444",
                borderWidth: 1,
                transition: "all 0.3s ease",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bfff",
                borderWidth: 2,
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.6)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
              transition: "all 0.3s ease",
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#00bfff",
                transform: "translate(0, -18px) scale(0.75)",
                letterSpacing: "1px",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff",
              fontWeight: 500,
              "&:focus": {
                color: "#fff",
              },
            },
          }}
        />

        {/* <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                bgcolor: color,
                cursor: "pointer",
                border: selectedColor === index ? "3px solid #fff" : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              onClick={() => setSelectedColor(index)}
            />
          ))}
        </Box> */}

        <Button
          variant="contained"
          color="primary"
          onClick={saveChanges}
          sx={{
            mt: 3,
            height: 50,
            width: "100%",
            borderRadius: 2,
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Save Changes
        </Button>
      </Card>
    </Box>
    </>
  );
};

export default Profile;
