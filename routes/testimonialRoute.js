const express = require("express");
const router = express.Router();
const testimonialController = require("../contollers/testimonialController");
const authController = require("../contollers/authController");

router.get("/", testimonialController.getAllTestimonials);

router.use(
  authController.protect,
  authController.restrictTo("admin", "editor")
);

router
  .route("/")
  .post(testimonialController.createTestimonial)
  .patch(testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

module.exports = router;
