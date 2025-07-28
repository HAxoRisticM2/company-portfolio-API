const Testimonial = require("../models/testimonialModel");

exports.getAllTestimonials = async (req, res) => {
  const testimonial = await Testimonial.find();
  const totalTestimonial = testimonial.length;
  res.status(201).json({
    testimonial,
    totalTestimonial,
  });
};

exports.createTestimonial = async (req, res) => {
  const testimonial = new Testimonial(req.body);
  await testimonial.save();
  res.status(201).json(testimonial);
};

exports.deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};

exports.updateTestimonial = async (req, res) => {
  const updatedService = Service.findByIdAndUpdate(req.params.id);
  await updatedService.save();
  res.status(201).json("updated");
};
