const express = require("express");
const router = express.Router();
const portfolioController = require("../contollers/portfolioController");
const authController = require("../contollers/authController");
const factory = require("../contollers/handlerFactory");
const uploadConfig = require("../utils/uploadConfig");
const uploadImg = require("../utils/uploadFactory");
const Portfolio = require("../models/portfolioModel");

router.patch(
  "/:id",
  uploadConfig.single("image"),
  uploadImg.deleteOldImage("image"),
  uploadImg.handleImageUpload("image"),
  factory.updateOne(Portfolio)
);

router.get("/", portfolioController.getAllProjects);
router.get("/:category", portfolioController.getProjectOnCategory);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  portfolioController.createProject
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  portfolioController.updateProject
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  portfolioController.deleteProject
);

module.exports = router;
