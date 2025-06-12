const PedagogiumCourses = require("../db/models/pedagogiumCoursesModel");

const allPedagogiumCourses = async () => await PedagogiumCourses.find({});

const findPedagogiumCourse = async (query) =>
  await PedagogiumCourses.findOne(query);

const findPedagogiumCourseByID = async (id) =>
  await PedagogiumCourses.findById(id);

const newPedagogiumCourse = async (body) =>
  await PedagogiumCourses(body).save();

const deletePedagogiumCourse = async (id) =>
  await PedagogiumCourses.findByIdAndDelete(id);

const updatePedagogiumCourse = async (id, body) =>
  await PedagogiumCourses.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allPedagogiumCourses,
  findPedagogiumCourse,
  findPedagogiumCourseByID,
  newPedagogiumCourse,
  deletePedagogiumCourse,
  updatePedagogiumCourse,
};
