const mongoose = require("mongoose");
const { deleteOldImageHook } = require("../utils/imageHooks");

const TestimonialSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 3 },
});
deleteOldImageHook(TestimonialSchema);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
