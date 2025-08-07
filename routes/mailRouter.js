const express = require("express");
const router = express.Router();
const mail = require("../utils/email");

router.post("/send-service-request", mail.sendServiceRequest);

module.exports = router;
