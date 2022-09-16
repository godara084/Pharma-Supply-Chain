import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manufacturer from "./components/Manufacturer/Manufacturer";
import Navbar from "./components/Navbar";
import Transporter from "./components/Transporter/Transporter";
import Retailer from "./components/Retailer/Retailer";
import Customer from "./components/Customer/Customer";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import { UserContext, UserProvider } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import NotFound from "./components/NotFound";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </UserProvider>
  );
}

function Main() {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const data = await axios.post("/auth/user");
    console.log(data.data);
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    fetchUser()
      .then((u) => {
        setUser(u);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  console.log(user);

  if (loading) return <CircularProgress />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user.role === "manufacturer" && (
        <Route path="/manufacturer" element={<Manufacturer />} />
      )}
      {user.role === "transporter" && (
        <Route path="/transporter" element={<Transporter />} />
      )}
      {user.role === "retailer" && (
        <Route path="/retailer" element={<Retailer />} />
      )}
      {user.role === "customer" && (
        <Route path="/customer" element={<Customer />} />
      )}
      {!user._id && (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
