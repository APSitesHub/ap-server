const express = require("express");

const getAllTestScUsers = require("../controllers/usersSpeaking/getAllTestScUsers");
// const updateTestScUser = require("../middlewares/speakings/updateTestScUser");
const addTestScUser = require("../controllers/usersSpeaking/addTestScUser");
// const editScUser = require("../controllers/usersSpeaking/editScUser");
const editTestScUser = require("../controllers/usersSpeaking/editTestScUser");

const router = express.Router();

router.get("/", getAllTestScUsers);

router.post("/", addTestScUser);

router.patch("/:id", editTestScUser);

module.exports = router;
