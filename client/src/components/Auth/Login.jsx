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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
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
  const [opt, setOpt] = useState(options[0].toLowerCase());
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    setData((prev) => {
      const temp = prev[e.target.name];
      temp.value = e.target.value;
      return { ...prev, [e.target.name]: temp };
    });
  };

  const handleLogin = async () => {
    setDisabled(true);
    try {
      const res = await axios.post("/auth/signin", {
        username: data.username.value,
        password: data.password.value,
        role: opt,
      });
      const u = await axios.post("/auth/user");
      setUser(u.data);
      navigate(`/${opt}`);
    } catch (e) {
      setError(e.message);
    }
    setDisabled(false);
  };

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
            disabled={disabled}
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
            disabled={disabled}
            sx={{ width: "100%" }}
          >
            {options.map((m, idx) => (
              <MenuItem key={idx} value={m.toLowerCase()}>
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
