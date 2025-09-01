const Teachers = require("../db/models/teachersModel");

const allTeachers = async () => await Teachers.find({});

const allEnTeachers = async () =>
  await Teachers.find({ $or: [{ lang: "en" }, { lang: "en de" }] }).select(
    "_id name"
  );

const allDeTeachers = async () =>
  await Teachers.find({ $or: [{ lang: "de" }, { lang: "en de" }] }).select(
    "_id name"
  );

const allPlTeachers = async () =>
  await Teachers.find({ lang: "pl" }).select("_id name");

const allTeachersBasicInfo = async () =>
  await Teachers.find({}).select("name lang altegioId crmId");

const findTeacher = async (query) => await Teachers.findOne(query);

const findTeacherByID = async (id) => await Teachers.findById(id);

const findTeacherByAltegioID = async (altegioId) =>
  await Teachers.findOne({ altegioId });

const newTeacher = async (body) => await Teachers(body).save();

const deleteTeacher = async (id) => await Teachers.findByIdAndDelete(id);

const signInTeacher = async (id, body) =>
  await Teachers.findByIdAndUpdate(id, body, { new: true });

const updateTeacher = async (id, body) =>
  await Teachers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allTeachers,
  allEnTeachers,
  allDeTeachers,
  allPlTeachers,
  allTeachersBasicInfo,
  findTeacher,
  findTeacherByID,
  findTeacherByAltegioID,
  newTeacher,
  deleteTeacher,
  signInTeacher,
  updateTeacher,
};
