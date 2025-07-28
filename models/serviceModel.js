const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
});

module.exports = mongoose.model("Service", ServiceSchema);
