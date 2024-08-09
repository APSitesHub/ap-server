const express = require("express");

const { validateTimetable } = require("../schema/timetableSchema");

const getTimetable = require("../controllers/timetable/getTimetable");
const addTimetable = require("../controllers/timetable/addTimetable");
const editTimetable = require("../controllers/timetable/editTimetable");
const editTimetableLesson = require("../controllers/timetable/editTimetableLesson");
const removeTimetable = require("../controllers/timetable/removeTimetable");
const removeScheduleFromTimetable = require("../controllers/timetable/removeScheduleFromTimetable");


const router = express.Router();

router.get("/", getTimetable);

router.post("/", validateTimetable, addTimetable);

router.put("/:id", validateTimetable, editTimetable);

router.patch("/:id", editTimetableLesson);

router.delete("/:id", removeTimetable);

router.patch("/schedule/:id", removeScheduleFromTimetable);

module.exports = router;
