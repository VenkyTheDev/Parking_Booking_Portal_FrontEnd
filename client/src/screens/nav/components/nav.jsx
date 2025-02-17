import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  Home,
  Info,
  Book,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";

const NavComponent = ({
  userInfo,
  ProfileImage,
  anchorEl,
  mobileOpen,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
  toggleDrawer,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand Logo */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
        >
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src="/ongridlogowhite.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </NavLink>
        </Typography>

        {userInfo.role === "ADMIN" && (
          <Box sx={{ flexGrow: 2, textAlign: "center" }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="normal"
              sx={{
                textTransform: "uppercase",
                fontFamily: "'Lora', serif",
                letterSpacing: "1.5px",
                fontSize: "1.5rem",
                lineHeight: 1.6,
                opacity: 0.9,
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              ADMIN
            </Typography>
          </Box>
        )}

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            component={NavLink}
            to="/home"
          >
            Home
          </Button>
          {userInfo?.role === "ADMIN" && (
            <>
              <Button
                color="inherit"
                startIcon={<AccountCircle />}
                component={NavLink}
                to="/actions"
              >
                Actions
              </Button>
              <Button
                color="inherit"
                startIcon={<ApartmentIcon />}
                component={NavLink}
                to="/organisations"
              >
                Organisations
              </Button>
            </>
          )}
          <Button
            color="inherit"
            startIcon={<Book />}
            component={NavLink}
            to="/history"
          >
            My Bookings
          </Button>
          <Button
            color="inherit"
            startIcon={<Info />}
            component={NavLink}
            to="/about"
          >
            About
          </Button>
        </Box>

        {/* User Avatar Dropdown */}
        {userInfo ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
              <Avatar src={ProfileImage} sx={{ bgcolor: "#ff7043" }}>
                {!userInfo.profilePic && userInfo.name?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
            >
              <MenuItem
                component={NavLink}
                to="/profile"
                onClick={handleMenuClose}
              >
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1, color: "red" }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={NavLink} to="/auth">
            Login
          </Button>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <List
          sx={{
            width: 250,
            background: "#16213e",
            height: "100%",
            color: "white",
          }}
        >
          <ListItem
            button
            component={NavLink}
            to="/home"
            onClick={toggleDrawer(false)}
          >
            <Home sx={{ color: "#00d4ff", mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          {userInfo?.role === "ADMIN" && (
            <>
            <ListItem
              button
              component={NavLink}
              to="/actions"
              onClick={toggleDrawer(false)}
            >
              <AccountCircle sx={{ color: "#ffcc00", mr: 1 }} />
              <ListItemText primary="Actions" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/organisations"
              onClick={toggleDrawer(false)}
            >
              <ApartmentIcon sx={{ color: "#ffcc00", mr: 1 }} />
              <ListItemText primary="Organisations " />
            </ListItem>
            </>
          )}
          <ListItem
            button
            component={NavLink}
            to="/history"
            onClick={toggleDrawer(false)}
          >
            <Book sx={{ color: "#ff00ff", mr: 1 }} />
            <ListItemText primary="My Bookings" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/about"
            onClick={toggleDrawer(false)}
          >
            <Info sx={{ color: "#00ff99", mr: 1 }} />
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavComponent;
