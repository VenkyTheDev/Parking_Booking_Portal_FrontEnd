import React from "react";
import { Tabs, Tab, Box, TextField, Button, Typography, Card, CardContent, Divider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Google } from "@mui/icons-material";

const AuthForm = ({ tabIndex, setTabIndex, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, organisationId, setOrganisationId, organisations, name, setName, handleLogin, handleSignup, loading, error }) => {
  return (
    <Card sx={{ width: { xs: "90%", md: "40%" }, borderRadius: 5, p: 3, backdropFilter: "blur(15px)", bgcolor: "rgba(255, 255, 255, 0.2)", boxShadow: 5 }}>
      <CardContent>
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" fontWeight="bold" color="primary">Welcome Back</Typography>
          <Typography variant="body1" color="textSecondary">Sign in or create an account</Typography>
        </Box>
        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} variant="fullWidth" sx={{ marginBottom: 2 }}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        {tabIndex === 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
            <Divider>OR</Divider>
            <Button variant="outlined" color="primary" fullWidth startIcon={<Google />}>Login with Google</Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <FormControl fullWidth>
              <InputLabel id="organisation-label">Organisation</InputLabel>
              <Select labelId="organisation-label" value={organisationId} onChange={(e) => setOrganisationId(e.target.value)} label="Organisation ID">
                {organisations.map((org) => (
                  <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth onClick={handleSignup} disabled={loading}>Signup</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthForm;