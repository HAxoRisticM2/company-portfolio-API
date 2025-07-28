const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  image: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
