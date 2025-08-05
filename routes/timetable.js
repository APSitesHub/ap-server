const express = require("express");

const {
  validateTimetable,
  validateScheduleInTimetable,
} = require("../schema/timetableSchema");

const getTimetable = require("../controllers/timetable/getTimetable");
const addTimetable = require("../controllers/timetable/addTimetable");
const editTimetableLesson = require("../controllers/timetable/editTimetableLesson");
const removeTimetable = require("../controllers/timetable/removeTimetable");
const removeScheduleFromTimetable = require("../controllers/timetable/removeScheduleFromTimetable");
const updateScheduleInTimetable = require("../controllers/timetable/updateScheduleInTimetable");
const editTimetableLevelCourse = require("../controllers/timetable/editTimetableLevelCourse");
const editTimetableHolidayStatus = require("../controllers/timetable/editTimetableHolidayStatus");

const router = express.Router();

router.get("/", getTimetable);

router.post("/", validateTimetable, addTimetable);

router.put("/:id", validateScheduleInTimetable, updateScheduleInTimetable);

router.patch("/:id", editTimetableLesson);

router.delete("/:id", removeTimetable);

router.patch("/course/:id", editTimetableLevelCourse);

router.patch("/schedule/:id", removeScheduleFromTimetable);

router.patch("/course/holiday/:id", editTimetableHolidayStatus);

module.exports = router;
