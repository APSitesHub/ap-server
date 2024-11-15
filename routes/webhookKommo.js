const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");

const router = express.Router();

router.post("/kommo", updateUserWithWebhook);

module.exports = router;
