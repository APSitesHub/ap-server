const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");
const getPlatformNumberAndPupilId = require("../middlewares/platform/getPlatformNumberAndPupilId");

const router = express.Router();

router.post("/kommo", getPlatformNumberAndPupilId, getResponsibleUser, updateUserWithWebhook);

module.exports = router;
