import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import { useAppStore } from "../../store";
import bgImage from "/bgImg.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organisationId, setOrganisationId] = useState(null);
  const [name, setName] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required" , {
        autoClose:1000
      });
      return false;
    } else if (!password.length) {
      toast.error("Password is required",{
        autoClose:1000
      });
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required",{
        autoClose:1000
      });
      return false;
    } else if (!password.length) {
      toast.error("Password is required",{
        autoClose:1000
      });
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match",{
        autoClose:1000
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, { email, password });
        if (response.data.user) {
          setUserInfo(response.data.user);
          toast.dismiss();
          toast.success("Successfully Logged in",{
            autoClose:1000
          })
          navigate("/profile");
        }
      } catch (error) {
        toast.error("Incorrect Credentials",{
          autoClose:1000
        });
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, {
          name,
          email,
          password,
          organisationId,
        }, { withCredentials: true });

        if (response.status === 200) {
          setUserInfo(response.data);
          navigate("/home");
        }
      } catch (error) {
        toast.error("Signup failed",{
          autoClose:1000
        });
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",}}
    >
      <Card sx={{ width: { xs: "90%", md: "40%" }, borderRadius: 5, p: 3, backdropFilter: "blur(15px)", bgcolor: "rgba(255, 255, 255, 0.2)", boxShadow: 5 }}>
        <CardContent>
          <Box textAlign="center" mb={2}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Sign in or create an account
            </Typography>
          </Box>
          <Tabs
            value={tabIndex}
            onChange={(e, newIndex) => setTabIndex(newIndex)}
            variant="fullWidth"
            sx={{ marginBottom: 2 }}
          >
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {tabIndex === 0 ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
              <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }} textAlign="right">
                Forgot Password?
              </Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
              </Button>
              <Divider>OR</Divider>
              <Button variant="outlined" color="primary" fullWidth startIcon={<Google />}>
                Login with Google
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <TextField label="Organisation ID" type="number" fullWidth value={organisationId || ""} onChange={(e) => setOrganisationId(e.target.value)} />
              <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
                Signup
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
