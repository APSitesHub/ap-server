const Lessons = require("../db/models/lessonsModel");

const getAllLessons = async () => await Lessons.find({});

const newLesson = async (body) => await Lessons(body).save();

const updateLesson = async (id, body) =>
  await Lessons.findByIdAndUpdate(id, body, { new: true });

const deleteLesson = async (id) => await Lessons.findByIdAndDelete(id);

module.exports = {
  getAllLessons,
  newLesson,
  updateLesson,
  deleteLesson,
};
