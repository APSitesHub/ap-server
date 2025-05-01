const UniUsers = require("../db/models/uniUsersModel");

const allUniUsers = async () =>
  await UniUsers.find({})
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);

const allPedagogiumUsers = async () =>
  await UniUsers.find({
    university: "Pedagogium (Wyższa Szkoła Nauk Społecznych)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allSSWUsers = async () =>
  await UniUsers.find({
    university: "SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const findUniUser = async (query) => await UniUsers.findOne(query);

const findUniUserByID = async (id) => await UniUsers.findById(id);

const newUniUser = async (body) => await UniUsers(body).save();

const deleteUniUser = async (id) => await UniUsers.findByIdAndDelete(id);

const signInUniUser = async (id, body) =>
  await UniUsers.findByIdAndUpdate(id, body, { new: true });

const signInUniUserOnLesson = async (id, body) =>
  await UniUsers.findByIdAndUpdate(id, body, { new: true });

const updateUniUser = async (id, body) =>
  await UniUsers.findByIdAndUpdate(id, body, { new: true });

const getPedagogiumAttendance = async () =>
  await UniUsers.find({
    university: "Pedagogium (Wyższa Szkoła Nauk Społecznych)",
    name: {
      $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski", "Veronika"],
    },
  }).select("name _id visited group");

const getWSTIJOAttendance = async () =>
  await UniUsers.find({
    university: "WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)",
  }).select("name _id visited");

const getWSBMIRAttendance = async () =>
  await UniUsers.find({
    university: "WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)",
  }).select("name _id visited");

const getEWSPAAttendance = async () =>
  await UniUsers.find({
    university:
      "EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)",
  }).select("name _id visited");

module.exports = {
  allUniUsers,
  allPedagogiumUsers,
  allSSWUsers,
  findUniUser,
  findUniUserByID,
  newUniUser,
  deleteUniUser,
  signInUniUser,
  signInUniUserOnLesson,
  updateUniUser,
  getPedagogiumAttendance,
  getWSTIJOAttendance,
  getWSBMIRAttendance,
  getEWSPAAttendance,
};
