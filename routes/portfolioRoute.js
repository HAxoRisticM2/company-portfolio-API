const express = require("express");
const router = express.Router();
const portfolioController = require("../contollers/portfolioController");

router.get("/", portfolioController.getAllProjects);
router.get("/:category", portfolioController.getProjectOnCategory);
router.post("/", portfolioController.createProject);
router.patch("/:id", portfolioController.updateProject);
router.delete("/:id", portfolioController.deleteProject);

module.exports = router;
