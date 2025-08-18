// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { deleteOldImageHook } = require("../utils/imageHooks");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
});

deleteOldImageHook(userSchema); //imageHook

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password compare method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
