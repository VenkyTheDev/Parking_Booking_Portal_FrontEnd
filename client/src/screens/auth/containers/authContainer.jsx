import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signup, fetchOrganisations } from "../api/api"
import AuthForm from "../components/authForm";
import { useAppStore } from "../../../store";
import { BACKGROUND_THEME } from "../../../utils/constants";

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
      toast.success("Successfully Logged in" , {
        autoClose: 1000,
      });
      navigate("/home");
    } catch {
      toast.error("Incorrect Credentials" ,{
        autoClose: 1000,
      });
    }
  };

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        return toast.error("Check all fields",{
          autoClose: 1000,
        });
    }

    if(password !== confirmPassword){
      return toast.error("Passwords do not match",{
        autoClose: 1000,
      });
    }
    if(password.length < 6){
      toast.dismiss();
      return toast.error("Password must be atleast 6 characters long",{
        autoClose: 1000,
      });
    } 
    
    if (!emailRegex.test(email)) {
        return toast.error("Enter a valid email address");
    }

    try {
        const response = await signup(name, email, password, organisationId);
        console.log("This is the response from " , response);
        setUserInfo(response.data);
        toast.dismiss();
        toast.success("Signup successful" , {
          autoClose: 1000,
        });
        navigate("/home");
    } catch {
        toast.error("Signup failed");
    }
};


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: `${BACKGROUND_THEME}` ,backgroundSize: "cover"}}>
      <AuthForm {...{ tabIndex, setTabIndex, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, organisationId, setOrganisationId, organisations, name, setName, handleLogin, handleSignup, loading, error }} />
    </Box>
  );
};

export default AuthContainer;