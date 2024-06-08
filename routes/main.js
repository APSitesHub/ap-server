const express = require("express");
const wakeUp = require("../controllers/main/wakeUp");

const router = express.Router();

router.get("/", wakeUp);

module.exports = router;
