const express = require("express");
const router = express.Router();

const teamController = require("../contollers/ourTeamController");

router.get("/", teamController.getAllMembers);
router.post("/", teamController.createMember);
router.patch("/:id", teamController.updateMember);
router.delete("/:id", teamController.deleteMember);

module.exports = router;
