const Testimonial = require("../models/testimonialModel");
const factory = require("../contollers/handlerFactory");

exports.getAllTestimonials = factory.getAll(Testimonial);

exports.createTestimonial = factory.createOne(Testimonial);

exports.deleteTestimonial = factory.deleteOne(Testimonial);

exports.updateTestimonial = factory.updateOne(Testimonial);
