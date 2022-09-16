import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn = false }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Pharma Supply Chain </Typography>
        <Box flexGrow={1} />
        {!isLoggedIn ? (
          <Link to="/login">
            <Button variant="contained" color="success">
              Login
            </Button>
          </Link>
        ) : (
          <Button color="error" variant="contained">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
