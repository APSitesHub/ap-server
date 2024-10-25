const Teachers = require("../db/models/teachersModel");

const allTeachers = async () => await Teachers.find({});

const findTeacher = async (query) => await Teachers.findOne(query);

const findTeacherByID = async (id) => await Teachers.findById(id);

const newTeacher = async (body) => await Teachers(body).save();

const deleteTeacher = async (id) => await Teachers.findByIdAndDelete(id);

const signInTeacher = async (id, body) =>
  await Teachers.findByIdAndUpdate(id, body, { new: true });

const updateTeacher = async (id, body) =>
  await Teachers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allTeachers,
  findTeacher,
  findTeacherByID,
  newTeacher,
  deleteTeacher,
  signInTeacher,
  updateTeacher,
};
