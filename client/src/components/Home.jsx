import { alpha, Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <Box
      width={"100vw"}
      minHeight={"100vh"}
      sx={(theme) => ({ background: alpha(theme.palette.primary.light, 0.5) })}
    >
      <Container sx={{ py: 10 }}>
        <Typography variant="h1" align="center">
          Pharma Supply Chain
        </Typography>
        <Typography
          variant="h5"
          color="text.disabled"
          align="center"
          sx={{ mt: 2 }}
        >
          Welcome to the Demonstration!
        </Typography>
        <Box display="flex" justifyContent={"space-around"} sx={{ mt: 15 }}>
          {user._id ? (
            <Link to={`/${user.role}`}>
              <Button sx={{ px: 5, py: 3 }}>Go to dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ px: 5, py: 3 }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ px: 5, py: 3 }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
