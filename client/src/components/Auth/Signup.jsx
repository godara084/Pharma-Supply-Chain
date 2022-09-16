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

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: { value: "", title: "Name", type: "text" },
    username: { value: "", title: "Username", type: "text" },
    password: { value: "", title: "Password", type: "password" },
    cnfPassword: { value: "", title: "Confirm Password", type: "password" },
  });
  const [options, setOptions] = useState([
    "Manufacturer",
    "Transporter",
    "Retailer",
    "Customer",
  ]);
  const [opt, setOpt] = useState(options[0].toLowerCase());
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    setData((prev) => {
      const temp = prev[e.target.name];
      temp.value = e.target.value;
      return { ...prev, [e.target.name]: temp };
    });
  };

  const handleSignup = async () => {
    // check for password === cnfPassword
    setDisable(true);
    console.log(data.password, data.cnfPassword);
    if (data.password.value !== data.cnfPassword.value) {
      setError("Password and Confirm Password dont match!");
      setDisable(false);
      return;
    }
    setError("");
    try {
      const res = await axios.post("/auth/signup", {
        name: data.name.value,
        username: data.username.value,
        password: data.password.value,
        role: opt,
      });
      setUser({
        ...res.data,
        name: data.name.value,
        username: data.username.value,
        role: opt,
      });
      navigate(`/${opt}`);
    } catch (e) {
      setError(e.message);
      setDisable(false);
    }
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
        <Typography variant="h4">Signup</Typography>
        {Object.keys(data).map((k) => (
          <TextField
            name={k}
            value={data[k].value}
            type={data[k].type}
            disabled={disable}
            label={data[k].title}
            onChange={handleChange}
            key={k}
            sx={(theme) => ({
              my: 1.5,
              width: "100%",
            })}
            variant="standard"
          />
        ))}
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <InputLabel id="manf-select-label">Sign Up As</InputLabel>
          <Select
            labelId="manf-select-label"
            id="manf-select"
            label="Sign Up As"
            value={opt}
            onChange={handleChangeOptions}
            sx={{ width: "100%" }}
            disabled={disable}
          >
            {options.map((m, idx) => (
              <MenuItem key={idx} value={m.toLowerCase()}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{ mt: 1.5, alignSelf: "flex-end" }}
        >
          Sign Up
        </Button>
        <Link to="/login" style={{ marginTop: 20 }}>
          Already a user! Login to access.
        </Link>
      </Card>
    </Container>
  );
};

export default Signup;
