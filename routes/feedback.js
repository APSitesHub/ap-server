const express = require("express");
const { saveFeedback } = require("../controllers/feedback/saveFeedback");
const { validateFeedback } = require("../schema/feedbackSchema");

const router = express.Router();

// POST /feedback/save - Save feedback data to Google Sheets
router.post("/save", validateFeedback, saveFeedback);

module.exports = router;
