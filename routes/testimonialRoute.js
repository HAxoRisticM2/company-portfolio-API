const express = require("express");
const router = express.Router();
const testimonialController = require("../contollers/testimonialController");
const authController = require("../contollers/authController");
const { uploadSingle, processImage } = require("../utils/imageUploader");
const addImageToBody = require("../utils/addImageToBody");

router.get("/", testimonialController.getAllTestimonials);

router.post(
  "/",
  uploadSingle("image"),
  processImage("Testimonial"),
  addImageToBody("image"),
  testimonialController.createTestimonial
);

router.patch(
  "/:id",
  uploadSingle("image"),
  processImage("Testimonial"),
  addImageToBody("image"),
  testimonialController.updateTestimonial
);

router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;
