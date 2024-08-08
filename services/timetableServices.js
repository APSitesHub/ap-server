const Timetable = require("../db/models/timetableModel");

const getAllTimetable = async () => await Timetable.find({});

const findTimetable = async () => await Timetable.findOne(query);

const newTimetable = async (body) => await Timetable(body).save();

const updateTimetable = async (id, body) =>
  await Timetable.findByIdAndUpdate(id, body, { new: true });

const deleteTimetable = async (id) => await Timetable.findByIdAndDelete(id);

module.exports = {
  getAllTimetable,
  findTimetable,
  newTimetable,
  updateTimetable,
  deleteTimetable,
};
