const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  message: { type: String, required: true },
  clientName: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
