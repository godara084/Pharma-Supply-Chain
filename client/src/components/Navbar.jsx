import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const logout = async () => {
    try {
      const res = await axios.post("/auth/logout");
      setUser({});
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
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
          <Button color="error" variant="contained" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
