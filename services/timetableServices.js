const Timetable = require("../db/models/timetableModel");

const getAllTimetable = async () => await Timetable.find({});

const findTimetable = async (query) => await Timetable.findOne(query);

const newTimetable = async (body) => await Timetable(body).save();

const updateTimetable = async (id, body) =>
  await Timetable.findByIdAndUpdate(
    id,
    {
      $push: {
        schedule: body,
      },
    },
    { upsert: true, new: true }
  );

const updateCourseHolidayStatus = async (id, body) =>
  await Timetable.findByIdAndUpdate(id, body, { new: true });

const updateOnlyTimetableInfo = async (id, body) =>
  await Timetable.findByIdAndUpdate(id, body, { new: true });

const updateTimetableWithoutCourse = async (id, body) =>
  await Timetable.findByIdAndUpdate(id, body, { new: true });

const deleteTimetable = async (id) => await Timetable.findByIdAndDelete(id);

const editSchedule = async (id, body) =>
  await Timetable.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllTimetable,
  findTimetable,
  newTimetable,
  updateTimetable,
  updateCourseHolidayStatus,
  updateOnlyTimetableInfo,
  updateTimetableWithoutCourse,
  deleteTimetable,
  editSchedule,
};
