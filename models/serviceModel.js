const mongoose = require("mongoose");
const { deleteOldImageHook } = require("../utils/imageHooks");

const ServiceSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
});

deleteOldImageHook(ServiceSchema);

module.exports = mongoose.model("Service", ServiceSchema);
