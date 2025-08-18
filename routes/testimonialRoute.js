const express = require("express");
const router = express.Router();
const testimonialController = require("../contollers/testimonialController");
const authController = require("../contollers/authController");
const { uploadSingle, processImage } = require("../utils/imageUploader");
const addImageToBody = require("../utils/addImageToBody");

router.get("/", testimonialController.getAllTestimonials);

router.use(
  authController.protect,
  authController.restrictTo("admin", "editor")
);

router
  .route("/:id")
  .post(
    uploadSingle("image"),
    processImage("Service"),
    addImageToBody("image"),
    testimonialController.createTestimonial
  )
  .patch(
    uploadSingle("image"),
    processImage("Service"),
    addImageToBody("image"),
    testimonialController.updateTestimonial
  )
  .delete(testimonialController.deleteTestimonial);

module.exports = router;
