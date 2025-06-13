const PedagogiumUsers = require("../db/models/pedagogiumUsers");

const allUniUsers = async () =>
  await PedagogiumUsers.find({})
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);

const allPedagogiumUsers = async () =>
  await PedagogiumUsers.find({
    university: "Pedagogium (Wyższa Szkoła Nauk Społecznych)",
    name: {
      $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski", "Student"],
    },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allWSTIJOUsers = async () =>
  await PedagogiumUsers.find({
    university: "WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)",
    name: {
      $nin: [
        "Pedagogium",
        "WSTIJO",
        "Dev Acc",
        "Krzysztof Lewandowski",
        "New Student",
        "Test Acc",
      ],
    },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allSSWUsers = async () =>
  await PedagogiumUsers.find({
    university: "SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allMANSUsers = async () =>
  await PedagogiumUsers.find({
    university: "MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allAHNSUsers = async () =>
  await PedagogiumUsers.find({
    university: "AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allANSWPUsers = async () =>
  await PedagogiumUsers.find({
    university: "ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const findUniUser = async (query) => await PedagogiumUsers.findOne(query);

const findUniUserByID = async (id) => await PedagogiumUsers.findById(id);

const newUniUser = async (body) => await PedagogiumUsers(body).save();

const deleteUniUser = async (id) => await PedagogiumUsers.findByIdAndDelete(id);

const signInUniUser = async (id, body) =>
  await PedagogiumUsers.findByIdAndUpdate(id, body, { new: true });

const signInUniUserOnLesson = async (id, body) =>
  await PedagogiumUsers.findByIdAndUpdate(id, body, { new: true });

const updateUniUser = async (id, body) =>
  await PedagogiumUsers.findByIdAndUpdate(id, body, { new: true });

const getPedagogiumAttendance = async () =>
  await PedagogiumUsers.find({
    university: "Pedagogium (Wyższa Szkoła Nauk Społecznych)",
    name: {
      $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski", "Veronika"],
    },
  }).select("name _id visited group");

const getWSTIJOAttendance = async () =>
  await PedagogiumUsers.find({
    university: "WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)",
    name: {
      $nin: [
        "Pedagogium",
        "WSTIJO",
        "Dev Acc",
        "Krzysztof Lewandowski",
        "New Student",
        "Test Acc",
      ],
    },
  }).select("name _id visited");

const getWSBMIRAttendance = async () =>
  await PedagogiumUsers.find({
    university: "WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)",
  }).select("name _id visited");

const getEWSPAAttendance = async () =>
  await PedagogiumUsers.find({
    university:
      "EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)",
  }).select("name _id visited");

module.exports = {
  allUniUsers,
  allPedagogiumUsers,
  allWSTIJOUsers,
  allSSWUsers,
  allMANSUsers,
  allAHNSUsers,
  allANSWPUsers,
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
