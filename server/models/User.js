const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["manufacturer", "transporter", "retailer", "customer"],
    default: "customer",
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
