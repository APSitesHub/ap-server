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

const deleteTimetable = async (id) => await Timetable.findByIdAndDelete(id);

const deleteSchedule = async (query, body) =>
  await Timetable.findOneAndUpdate(
    { _id: query._id },
    {
      $pull: { schedule: { _id: query.scheduleId } },
    },
    { safe: true }
  );

module.exports = {
  getAllTimetable,
  findTimetable,
  newTimetable,
  updateTimetable,
  deleteTimetable,
  deleteSchedule,
};
