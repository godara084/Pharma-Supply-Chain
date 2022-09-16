import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: { value: "", title: "Username", type: "text" },
    password: { value: "", title: "Password", type: "password" },
  });
  const [options, setOptions] = useState([
    "Manufacturer",
    "Transporter",
    "Retailer",
    "Customer",
  ]);
  const [opt, setOpt] = useState(options[0]);

  const handleChange = (e) => {
    setData((prev) => {
      const temp = prev[e.target.name];
      temp.value = e.target.value;
      return { ...prev, [e.target.name]: temp };
    });
  };

  const handleLogin = () => {};

  const handleChangeOptions = (e) => {
    setOpt(e.target.value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Login</Typography>
        {Object.keys(data).map((k) => (
          <TextField
            name={k}
            value={data[k].value}
            type={data[k].type}
            label={data[k].title}
            onChange={handleChange}
            key={k}
            sx={(theme) => ({
              my: 1.5,
              width: "100%",
            })}
            variant="standard"
          />
        ))}{" "}
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <InputLabel id="manf-select-label">Login As</InputLabel>
          <Select
            labelId="manf-select-label"
            id="manf-select"
            label="Login As"
            value={opt}
            onChange={handleChangeOptions}
            sx={{ width: "100%" }}
          >
            {options.map((m, idx) => (
              <MenuItem key={idx} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 1.5, alignSelf: "flex-end" }}
        >
          Login
        </Button>
        <Link to="/signup" style={{ marginTop: 20 }}>
          New here! Signup to access.
        </Link>
      </Card>
    </Container>
  );
};

export default Login;
