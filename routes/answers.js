const express = require("express");

const getAllAnswers = require("../controllers/answers/getAllAnswers");
const getAnswersByQuery = require("../controllers/answers/getAnswersByQuery");
const getAnswersByQuestion = require("../controllers/answers/getAnswersByQuestion");
const addAnswer = require("../controllers/answers/addAnswer");
const removeAnswerByQuestion = require("../controllers/answers/removeAnswersByQuestion");

const router = express.Router();

router.get("/", getAllAnswers);

router.get("/q", getAnswersByQuery);

router.get("/:id", getAnswersByQuestion);

router.post("/", addAnswer);

router.delete("/", removeAnswerByQuestion);

module.exports = router;
