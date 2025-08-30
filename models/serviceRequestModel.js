const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  service: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);
