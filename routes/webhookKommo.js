const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");
const getPlatformNumber = require("../middlewares/platform/getPlatformNumber");

const router = express.Router();

router.post("/kommo", getPlatformNumber, updateUserWithWebhook);

module.exports = router;
