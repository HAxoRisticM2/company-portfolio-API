const express = require("express");
const router = express.Router();
const serviceController = require("../contollers/serviceController");
const authController = require("../contollers/authController");
const { uploadSingle, processImage } = require("../utils/imageUploader");
const addImageToBody = require("../utils/addImageToBody");

router.get("/", serviceController.getAllServices);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  uploadSingle("image"),
  processImage("Service"),
  addImageToBody("image"),
  serviceController.createService
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  uploadSingle("image"),
  processImage("Service"),
  addImageToBody("image"),
  serviceController.updateService
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  serviceController.deleteService
);

module.exports = router;
