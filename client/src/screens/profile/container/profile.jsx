import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { updateProfile, uploadProfileImage, deleteProfileImage } from "../api";
import ProfileForm from "../component/profileForm";
import bgImage from "/bgImg.jpg";
import Nav from "../../nav";
import { useAppStore } from "../../../store";
import { HOST } from "../../../utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore(); 
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [department, setDepartment] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.profilePic) setImage(`${HOST}/${userInfo.profilePic.replace(/^\/+/, "")}`);
    setContactNumber(userInfo.contactNumber || "");
    setDepartment(userInfo.department || "");
  }, [userInfo]);

  const validateProfile = () => {
    if (!name || !contactNumber) {
      toast.error("Name and Contact Number are required", { autoClose: 1000 });
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (!validateProfile()) return;
    try {
      const updatedUser = await updateProfile(userInfo.id, { name, contactNumber, department });
      setUserInfo(updatedUser);
      toast.success("Profile Updated Successfully", { autoClose: 1000 });
      navigate("/sample");
    } catch {
      toast.error("Failed to update profile", { autoClose: 1000 });
    }
  };

  const handleFileInputClick = () => fileInputRef.current.click();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const updatedUser = await uploadProfileImage(userInfo.id, file);
      setUserInfo(updatedUser);
      setImage(`${HOST}/${updatedUser.profilePic.replace(/^\/+/, "")}`);
      toast.success("Image Updated Successfully", { autoClose: 1000 });
    } catch {
      toast.error("Failed to update image", { autoClose: 1000 });
    }
  };

  const handleDeleteImage = async () => {
    try {
      const updatedUser = await deleteProfileImage(userInfo.id);
      setUserInfo(updatedUser);
      setImage(null);
      toast.success("Profile image removed successfully", { autoClose: 1000 });
    } catch {
      toast.error("Failed to remove image", { autoClose: 1000 });
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}>
        <ProfileForm
          name={name}
          setName={setName}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          department={department}
          setDepartment={setDepartment}
          image={image}
          handleFileInputClick={handleFileInputClick}
          handleImageChange={handleImageChange}
          handleDeleteImage={handleDeleteImage}
          handleSaveChanges={handleSaveChanges}
          navigate={navigate}
          userInfo={userInfo}
          fileInputRef={fileInputRef}
        />
      </Box>
    </>
  );
};

export default Profile;
