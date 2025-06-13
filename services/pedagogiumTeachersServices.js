const PedagogiumTeachers = require("../db/models/pedagogiumTeachersModel");

const allTeachers = async () => await PedagogiumTeachers.find({});

const findTeacher = async (query) => await PedagogiumTeachers.findOne(query);

const findTeacherByID = async (id) => await PedagogiumTeachers.findById(id);

const findTeacherByAltegioID = async (altegioId) =>
  await PedagogiumTeachers.findOne({ altegioId });

const newTeacher = async (body) => await PedagogiumTeachers(body).save();

const deleteTeacher = async (id) =>
  await PedagogiumTeachers.findByIdAndDelete(id);

const signInTeacher = async (id, body) =>
  await PedagogiumTeachers.findByIdAndUpdate(id, body, { new: true });

const updateTeacher = async (id, body) =>
  await PedagogiumTeachers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allTeachers,
  findTeacher,
  findTeacherByID,
  findTeacherByAltegioID,
  newTeacher,
  deleteTeacher,
  signInTeacher,
  updateTeacher,
};
