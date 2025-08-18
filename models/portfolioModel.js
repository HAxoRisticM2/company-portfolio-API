const mongoose = require("mongoose");
const { deleteOldImageHook } = require("../utils/imageHooks");

const PortfolioSchema = new mongoose.Schema({
  image: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
});

deleteOldImageHook(PortfolioSchema);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
