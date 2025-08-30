const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["service-request", "contact-form", "welcome-email"], // Add more as needed
  },
  subject: { type: String, required: true },
  htmlContent: { type: String, required: true },
  variables: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
EmailTemplateSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
