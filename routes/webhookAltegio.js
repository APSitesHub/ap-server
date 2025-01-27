const express = require("express");
const router = express.Router();

router.post(
  "/test",(req, res) => {
    console.log(req.body?.data.client)
    res.status(200).json({ message: "OK" })
  }
);
module.exports = router;
