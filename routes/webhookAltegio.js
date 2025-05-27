const express = require("express");
const router = express.Router();
const { altegioWebhook } = require('../services/webhook/altegioWebhookTrialLesson');
const { altegioWebhookIndividualLesson } = require("../services/webhook/altegioWebhookIndividualLesson");
router.post(
  "/test", altegioWebhook
);
router.post(
    "/individual-lesson",   altegioWebhookIndividualLesson,
)
module.exports = router;
