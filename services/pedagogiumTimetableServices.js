const PedagogiumTimetable = require("../db/models/pedagogiumTimetableModel");

const getAllPedagogiumTimetable = async () =>
  await PedagogiumTimetable.find({});

const findPedagogiumTimetable = async (query) =>
  await PedagogiumTimetable.findOne(query);

const newPedagogiumTimetable = async (body) =>
  await PedagogiumTimetable(body).save();

const updatePedagogiumTimetable = async (id, body) =>
  await PedagogiumTimetable.findByIdAndUpdate(
    id,
    {
      $push: {
        schedule: body,
      },
    },
    { upsert: true, new: true }
  );

const updatePedagogiumTimetableWithoutCourse = async (id, body) =>
  await PedagogiumTimetable.findByIdAndUpdate(id, body, { new: true });

const deletePedagogiumTimetable = async (id) =>
  await PedagogiumTimetable.findByIdAndDelete(id);

const editPedagogiumSchedule = async (id, body) =>
  await PedagogiumTimetable.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllPedagogiumTimetable,
  findPedagogiumTimetable,
  newPedagogiumTimetable,
  updatePedagogiumTimetable,
  updatePedagogiumTimetableWithoutCourse,
  deletePedagogiumTimetable,
  editPedagogiumSchedule,
};
