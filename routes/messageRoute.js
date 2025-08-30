const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../contollers/messageController");

// Public routes
router.post("/", createMessage);

// Protected routes (will add auth middleware later)
router.get("/", getMessages);
// router.get("/:id", getMessage);
router.patch("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
