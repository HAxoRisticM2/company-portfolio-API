const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/services", require("./routes/ServiceRoute"));
app.use("/api/portfolio", require("./routes/portfolioRoute"));
app.use("/api/testimonial", require("./routes/testimonialRoute"));
app.use("/api/ourTeam", require("./routes/ourTeamRoute"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/mail", require("./routes/mailRouter"));
app.use("/api/contact", require("./routes/messageRoute"));
module.exports = app;
