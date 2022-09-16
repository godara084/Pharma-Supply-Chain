require("dotenv").config();
const express = require("express");
const db = require("./config/db_config");
const path = require("path");
const cookieParser = require("cookie-parser");

// Routers
const auth = require("./routes/auth");

// PORT
const PORT = process.env.PORT || 5000;

// App
const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.resolve(__dirname, "./public")));

// Routes
app.use("/auth", auth);

// Listen
app.listen(PORT, () => {
  console.log("Server is up and running!");
});
