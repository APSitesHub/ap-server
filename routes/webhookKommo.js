const express = require("express");

const router = express.Router();
router.post("/kommo", (req, res) => {
  console.log("Webhook received");
  console.log(req.body.leads.update[0].pipeline_id);

  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
  }

  return res.status(200).json({ message: "OK" });
});
module.exports = router;
