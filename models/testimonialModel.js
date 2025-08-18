const mongoose = require("mongoose");
const { deleteOldImageHook } = require("../utils/imageHooks");

const TestimonialSchema = new mongoose.Schema({
  message: { type: String, required: true },
  clientName: { type: String, required: true },
  image: { type: String, required: true },
});
deleteOldImageHook(TestimonialSchema);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
