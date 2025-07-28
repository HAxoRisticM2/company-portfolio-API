const express = require("express");
const router = express.Router();
const testimonialController = require("../contollers/testimonialController");

router.get("/", testimonialController.getAllTestimonials);
router.post("/", testimonialController.createTestimonial);
router.delete("/", testimonialController.deleteTestimonial);

module.exports = router;
