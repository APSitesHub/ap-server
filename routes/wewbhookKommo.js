const express = require("express");

const router = express.Router();
router.post("/kommo", (req, res) => {
  console.log("Webhook received");
  return res.status(200).json({ message: "OK" });
});
module.exports = router;
