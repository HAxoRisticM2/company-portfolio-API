require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const seedTemplates = require("./utils/seedTemplates");

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
