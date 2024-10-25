const express = require("express");

const router = express.Router();
router.post("/kommo", (req, res) => {
  console.log("Request Headers:", JSON.stringify(req.body));
  return res.status(200).json({ message: "OK" });
});
module.exports = router;
