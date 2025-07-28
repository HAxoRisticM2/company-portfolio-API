require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/api/services", require("./routes/ServiceRoute"));
app.use("/api/portfolio", require("./routes/portfolioRoute"));
app.use("/api/testimonial", require("./routes/testimonialRoute"));
app.use("/api/ourTeam", require("./routes/ourTeamRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
