const express = require("express");
const router = express.Router();
const serviceController = require("../contollers/serviceController");

router.get("/", serviceController.getAllServices);
router.post("/", serviceController.createService);
router.patch("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
