const express = require("express");

const {
  validatePedagogiumTimetable,
  validateScheduleInPedagogiumTimetable,
} = require("../schema/pedagogiumTimetableSchema");

const getPedagogiumTimetable = require("../controllers/pedagogiumTimetable/getPedagogiumTimetable");
const addPedagogiumTimetable = require("../controllers/pedagogiumTimetable/addPedagogiumTimetable");
const updateScheduleInPedagogiumTimetable = require("../controllers/pedagogiumTimetable/updateScheduleInPedagogiumTimetable");
const editPedagogiumTimetableLesson = require("../controllers/pedagogiumTimetable/editPedagogiumTimetableLesson");
const removePedagogiumTimetable = require("../controllers/pedagogiumTimetable/removePedagogiumTimetable");
const removeScheduleFromPedagoguimTimetable = require("../controllers/pedagogiumTimetable/removeScheduleFromPedagoguimTimetable");

const router = express.Router();

router.get("/", getPedagogiumTimetable);

router.post("/", validatePedagogiumTimetable, addPedagogiumTimetable);

router.put(
  "/:id",
  validateScheduleInPedagogiumTimetable,
  updateScheduleInPedagogiumTimetable
);

router.patch("/:id", editPedagogiumTimetableLesson);

router.delete("/:id", removePedagogiumTimetable);

router.patch("/schedule/:id", removeScheduleFromPedagoguimTimetable);

module.exports = router;
