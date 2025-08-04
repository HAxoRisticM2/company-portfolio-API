const express = require("express");
const router = express.Router();
const serviceController = require("../contollers/serviceController");
const authController = require("../contollers/authController");

router.get("/", serviceController.getAllServices);
router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  serviceController.createService
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  serviceController.updateService
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  serviceController.deleteService
);

module.exports = router;
