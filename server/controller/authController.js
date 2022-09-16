require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRounds = 10;
const JWT = require("./JWTController");
const errorHander = require("../handler/error");

// ----------------------------------------------------Helper Functions-----------------------------------------------------

//check if a user is exists or not
const userExists = async (username, role) => {
  const isUser = await User.findOne({ username: username, role: role });
  return isUser;
};

// encrypt the password
const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// compare the password to hashed password
const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

// -----------------------------------------------------End of helper functions-------------------------------------------------

//------------------------------------------------Middleware for authorization and authentication checks---------------------------------------------

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.access;
    const refreshToken = req.cookies.refresh;
    if (!token && !refreshToken) {
      // res.status(403).json({ error: "Unverified user" });
      errorHander.handleUnauthorized(res);
      return;
    }
    let user = JWT.verifyToken(token);
    if (!user) {
      const access = await JWT.regenerateAccessToken(refreshToken);
      if (!access) {
        // res.status(403).json({ error: "Invalid Token" });
        errorHander.handleUnauthorized(res);
        return;
      }
      user = JWT.verifyToken(access);
      res.cookie("access", access, {
        httpOnly: true,
        maxAge: JWT.accessExpiry * 1000,
      });
      res.cookie("user", JSON.stringify(user), {
        httpOnly: false,
        maxAge: JWT.accessExpiry * 1000,
      });
    }
    req.user = await User.findById(user._id).select("-password");
    // req.user = user;
    next();
  } catch (e) {
    errorHander.handleInternalServer(res);
  }
};

exports.isManufacturer = async (req, res, next) => {
  try {
    if (req.user.role !== "manufacturer")
      return errorHander.handleUnauthorized(res);
    next();
  } catch (e) {
    errorHander.handleInternalServer(res);
  }
};

exports.isTransporter = async (req, res, next) => {
  try {
    if (req.user.role !== "transporter")
      return errorHander.handleUnauthorized(res);
    next();
  } catch (e) {
    errorHander.handleInternalServer(res);
  }
};

exports.isRetailer = async (req, res, next) => {
  try {
    if (req.user.role !== "retailer")
      return errorHander.handleUnauthorized(res);
    next();
  } catch (e) {
    errorHander.handleInternalServer(res);
  }
};

exports.isCustomer = async (req, res, next) => {
  try {
    if (req.user.role !== "customer")
      return errorHander.handleUnauthorized(res);
    next();
  } catch (e) {
    errorHander.handleInternalServer(res);
  }
};

// --------------------------------------------------------End of Middleware----------------------------------------------------------

//---------------------------------------------------------Authentication Controllers-------------------------------------------------

exports.signup = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.username ||
      !req.body.password ||
      !req.body.role
    ) {
      return errorHander.handleBadRequest(res);
    }

    const user = await userExists(req.body.username, req.body.role);
    if (user)
      return errorHander.handleConflict(res, "Username already in use.");

    // If User is not already exist and all fields are valid then we will save the user in our database
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
      password: await encryptPassword(req.body.password),
    });
    await newUser.save();

    // Get JWT token
    const err = JWT.setCookies(res, newUser);
    if (err) throw err;
    res.status(200).json({ _id: newUser._id });
  } catch (e) {
    console.log(e);
    errorHander.handleInternalServer(res);
  }
};

exports.signin = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.role) {
      return errorHander.handleBadRequest(res);
    }

    // Check if a User exists or not
    const user = await userExists(req.body.username, req.body.role);

    //If user does not exists then throw error
    if (!user) return errorHander.handleNotFound(res, "Invalid Credentials");

    // Check the password is correct or not
    const compareHashedPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!compareHashedPassword)
      return errorHander.handleBadRequest(res, "Invalid Credentials");

    //set a token
    const err = JWT.setCookies(res, user);
    if (err) throw err;
    res.status(200).json({ _id: user._id });
  } catch (e) {
    console.log(e);
    errorHander.handleInternalServer(res);
  }
};

exports.logout = (req, res) => {
  res.cookie("access", "", {
    httpOnly: true,
  });
  res.cookie("refresh", "", {
    httpOnly: true,
  });
  res.cookie("user", "", {
    httpOnly: false,
  });
  res.json({ success: "Logged out successfully." });
};

// -------------------------------------------------------------End of Authroization Controllers -----------------------------------------------------
