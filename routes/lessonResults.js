const express = require("express");

const getLessonsByGroup = require("../controllers/lessonResults/getLessonsByGroup");
const getLessonsByGroupAndDate = require("../controllers/lessonResults/getLessonsByGroupAndDate");
const findPointsByLessonId = require("../controllers/lessonResults/findPointsByLessonId");
const addLesson = require("../controllers/lessonResults/addLesson");
const addQuestion = require("../controllers/lessonResults/addQuestion");
const {
  validateLessonResults,
  validateLessonResultsQuestion,
} = require("../schema/lessonResultsSchema");

const router = express.Router();

router.get("/findOne/:group", getLessonsByGroup);

router.get("/findOne/:group/:date", getLessonsByGroupAndDate);

router.get("/points/:lessonId", findPointsByLessonId);

router.post("/", validateLessonResults, addLesson);

router.post("/question/:lessonId", validateLessonResultsQuestion, addQuestion);

module.exports = router;
