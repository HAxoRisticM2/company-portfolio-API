// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT EXCEPTION.. SHUTTING DOWN SERVER");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
// app.use(morgan("dev"));

// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("database connected"))
//   .catch((err) => console.log(err));

// app.use("/api/services", require("./routes/ServiceRoute"));
// app.use("/api/portfolio", require("./routes/portfolioRoute"));
// app.use("/api/testimonial", require("./routes/testimonialRoute"));
// app.use("/api/ourTeam", require("./routes/ourTeamRoute"));
// app.use("/api/users", require("./routes/userRouter"));
// app.use("/api/mail", require("./routes/mailRouter"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Running on ${PORT}`));
// server.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION.. SHUTTING DOWN SERVER");
  console.log(err.name, err.message);
  process.exit(1);
});

// DB Connection
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
