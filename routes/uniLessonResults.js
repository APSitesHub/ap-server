const express = require("express");

const getLessonsByGroup = require("../controllers/uniLessonResults/getLessonsByGroup");
const getLessonsByGroupAndDate = require("../controllers/uniLessonResults/getLessonsByGroupAndDate");
const findPointsByLessonId = require("../controllers/uniLessonResults/findPointsByLessonId");
const addLesson = require("../controllers/uniLessonResults/addLesson");
const addQuestion = require("../controllers/uniLessonResults/addQuestion");
const {
  validateLessonResults,
  validateLessonResultsQuestion,
} = require("../schema/uniLessonResultsSchema");

const router = express.Router();

router.get("/findOne/:group", getLessonsByGroup);

router.get("/findOne/:group/:date", getLessonsByGroupAndDate);

router.get("/points/:lessonId", findPointsByLessonId);

router.post("/", validateLessonResults, addLesson);

router.post("/question/:lessonId", validateLessonResultsQuestion, addQuestion);

module.exports = router;
