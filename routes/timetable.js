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

const router = express.Router();

router.get("/", getTimetable);

router.post("/", validateTimetable, addTimetable);

router.put("/:id", validateScheduleInTimetable, updateScheduleInTimetable);

router.patch("/:id", editTimetableLesson);

router.delete("/:id", removeTimetable);

router.patch("/schedule/:id", removeScheduleFromTimetable);

module.exports = router;
