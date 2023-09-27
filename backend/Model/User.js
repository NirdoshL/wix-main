const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userInfo: {
    browser: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      select: false,
    },
    os: {
      type: String,
      select: false,
    },
    ip_address: {
      type: String,
      select: false,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    default: "user",
  },
  isLogged: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
    select: false,
  },
  resID: {
    type: String,
    select: true,
    default: undefined,
  },
  resName: {
    type: String,
    select: true,
    default: undefined,
  },
  resAddress: {
    type: String,
    select: true,
    default: undefined,
  },
  accessToken: [String],
});
module.exports = User = mongoose.model("users", UserSchema);
