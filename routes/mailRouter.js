const express = require("express");
const router = express.Router();
const mail = require("../utils/email");

router.post("/sendServiceRequest", mail.createServiceRequest);

module.exports = router;
