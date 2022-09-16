import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Page Not Found!</Typography>
        <Link to="/">
          <Button sx={{ textTransform: "none" }}>Go to home</Button>
        </Link>
      </Container>
    </Box>
  );
};

export default NotFound;
