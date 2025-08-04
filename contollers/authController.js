// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Add token to response header
  res.setHeader("Authorization", `Bearer ${token}`);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = () =>
  catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    createSendToken(newUser, 200, res);
  });

exports.loginUser = () =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("please provide email and password", 400));
    }

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("Invalid Username or password", 401));

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new AppError("Invalid Username or password", 401));

    createSendToken(user, 200, res);
  });

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user no longer exists.", 401));
  }

  // 4. Attach user to request
  req.user = currentUser;
  console.log("Token verified:", req.user);

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    console.log("User role:", req.user.role);

    next();
  };
};
