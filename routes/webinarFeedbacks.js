const express = require("express");
const getWebinarById = require("../controllers/webinarFeedbacks/getWebinarById");
const addFeedback = require("../controllers/webinarFeedbacks/addFeedback");

const router = express.Router();

router.get("/:id", getWebinarById);

router.post("/:id", addFeedback);

module.exports = router;
