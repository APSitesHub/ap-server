const express = require("express");

const getAllTestScUsers = require("../controllers/usersSpeaking/getAllTestScUsers");
const updateTestScUser = require("../middlewares/speakings/updateTestScUser");
const addTestScUser = require("../controllers/usersSpeaking/addTestScUser");
const router = express.Router();

router.get("/", updateTestScUser, getAllTestScUsers);

router.post("/", addTestScUser);

module.exports = router;
