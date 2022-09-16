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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/transporter" element={<Transporter />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
