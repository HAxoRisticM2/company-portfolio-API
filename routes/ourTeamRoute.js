const express = require("express");
const router = express.Router();
const teamController = require("../contollers/ourTeamController");
const authController = require("../contollers/authController");
const { uploadSingle, processImage } = require("../utils/imageUploader");
const addImageToBody = require("../utils/addImageToBody");

router.get("/", teamController.getAllMembers);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  uploadSingle("image"), // Handles file upload
  processImage("OurTeam"), // Compress & save
  addImageToBody("image"), // Injects URL into req.body
  teamController.createMember
);

router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  uploadSingle("image"),
  processImage("OurTeam"), // Compress & save
  addImageToBody("image"),
  teamController.updateMember
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  teamController.deleteMember
);

module.exports = router;
