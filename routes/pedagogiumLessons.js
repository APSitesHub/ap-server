const express = require("express");

const getLessonsByGroup = require("../controllers/pedagogiumLessons/getLessonsByGroup");
const getLessonsByGroupAndDate = require("../controllers/pedagogiumLessons/getLessonsByGroupAndDate");
const findPointsByLessonId = require("../controllers/pedagogiumLessons/findPointsByLessonId");
const addLesson = require("../controllers/pedagogiumLessons/addLesson");
const addQuestion = require("../controllers/pedagogiumLessons/addQuestion");
const {
  validatePedagogiumLesson,
  validatePedagogiumLessonQuestion,
} = require("../schema/pedagogiumLessonSchema");

const router = express.Router();

router.get("/findOne/:group", getLessonsByGroup);

router.get("/findOne/:group/:date", getLessonsByGroupAndDate);

router.get("/points/:lessonId", findPointsByLessonId);

router.post("/", validatePedagogiumLesson, addLesson);

router.post(
  "/question/:lessonId",
  validatePedagogiumLessonQuestion,
  addQuestion
);

module.exports = router;
