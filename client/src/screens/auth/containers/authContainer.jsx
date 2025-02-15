import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signup, fetchOrganisations } from "../api/api"
import AuthForm from "../components/authForm";
import bgImage from "/bgImg.jpg";
import { useAppStore } from "../../../store";

const AuthContainer = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organisationId, setOrganisationId] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrganisations = async () => {
      setLoading(true);
      try {
        const response = await fetchOrganisations();
        console.log("This is the organisations" , response);
        setOrganisations(response.data);
      } catch {
        setError("Failed to load organisations.");
      } finally {
        setLoading(false);
      }
    };
    loadOrganisations();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return toast.error("All fields are required");
    try {
      const response = await login(email, password);
      setUserInfo(response.data.user);
      toast.success("Successfully Logged in");
      navigate("/profile");
    } catch {
      toast.error("Incorrect Credentials");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || password !== confirmPassword) return toast.error("Check all fields");
    try {
      const response = await signup(name, email, password, organisationId);
      setUserInfo(response.data);
      navigate("/home");
    } catch {
      toast.error("Signup failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: "#A1E3F9" ,backgroundSize: "cover"}}>
      <AuthForm {...{ tabIndex, setTabIndex, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, organisationId, setOrganisationId, organisations, name, setName, handleLogin, handleSignup, loading, error }} />
    </Box>
  );
};

export default AuthContainer;