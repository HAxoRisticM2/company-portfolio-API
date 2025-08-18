const express = require("express");
const router = express.Router();
const portfolioController = require("../contollers/portfolioController");
const authController = require("../contollers/authController");
const factory = require("../contollers/handlerFactory");
const Portfolio = require("../models/portfolioModel");
const { uploadSingle, processImage } = require("../utils/imageUploader");
const addImageToBody = require("../utils/addImageToBody");

router.get("/", portfolioController.getAllProjects);
router.get("/:category", portfolioController.getProjectOnCategory);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  uploadSingle("image"), // Handles file upload
  processImage("Porfolio"), // Compress & save
  addImageToBody("image"), // Injects URL into req.body
  portfolioController.createProject
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  uploadSingle("image"), // Handles file upload
  processImage("OurTeam"), // Compress & save
  addImageToBody("image"), // Injects URL into req.body
  portfolioController.updateProject
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  portfolioController.deleteProject
);

module.exports = router;
