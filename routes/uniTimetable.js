const express = require("express");

const {
  validateUniTimetable,
  validateScheduleInUniTimetable,
} = require("../schema/uniTimetableSchema");

const getUniTimetable = require("../controllers/uniTimetable/getUniTimetable");
const addUniTimetable = require("../controllers/uniTimetable/addUniTimetable");
const updateScheduleInUniTimetable = require("../controllers/uniTimetable/updateScheduleInUniTimetable");
const editUniTimetableLesson = require("../controllers/uniTimetable/editUniTimetableLesson");
const removeUniTimetable = require("../controllers/uniTimetable/removeUniTimetable");
const editUniTimetableMarathon = require("../controllers/uniTimetable/editUniTimetableLevelCourse");
const removeScheduleFromUniTimetable = require("../controllers/uniTimetable/removeScheduleFromUniTimetable");

const router = express.Router();

router.get("/", getUniTimetable);

router.post("/", validateUniTimetable, addUniTimetable);

router.put(
  "/:id",
  validateScheduleInUniTimetable,
  updateScheduleInUniTimetable
);

router.patch("/:id", editUniTimetableLesson);

router.delete("/:id", removeUniTimetable);

router.patch("/marathon/:id", editUniTimetableMarathon);

router.patch("/schedule/:id", removeScheduleFromUniTimetable);

module.exports = router;
