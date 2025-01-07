const UniTimetable = require("../db/models/uniTimetableModel");

const getAllUniTimetable = async () => await UniTimetable.find({});

const findUniTimetable = async (query) => await UniTimetable.findOne(query);

const newUniTimetable = async (body) => await UniTimetable(body).save();

const updateUniTimetable = async (id, body) =>
  await UniTimetable.findByIdAndUpdate(
    id,
    {
      $push: {
        schedule: body,
      },
    },
    { upsert: true, new: true }
  );

const updateOnlyUniTimetableInfo = async (id, body) =>
  await UniTimetable.findByIdAndUpdate(id, body, { new: true });

const updateUniTimetableWithoutCourse = async (id, body) =>
  await UniTimetable.findByIdAndUpdate(id, body, { new: true });

const deleteUniTimetable = async (id) =>
  await UniTimetable.findByIdAndDelete(id);

const editUniSchedule = async (id, body) =>
  await UniTimetable.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllUniTimetable,
  findUniTimetable,
  newUniTimetable,
  updateUniTimetable,
  updateOnlyUniTimetableInfo,
  updateUniTimetableWithoutCourse,
  deleteUniTimetable,
  editUniSchedule,
};
