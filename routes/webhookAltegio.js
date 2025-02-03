const express = require("express");
const router = express.Router();
const { altegioWebhook } = require('../services/altegioWebhook')
router.post(
  "/test", altegioWebhook
);
module.exports = router;
