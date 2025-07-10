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
    name: {
      $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski", "Student"],
    },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allWSTIJOUsers = async () =>
  await UniUsers.find({
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

  const allWSKMUsers = async () =>
  await UniUsers.find({
    university: "WSKM (Wyższa Szkoła Kadr Menedżerskich)",
    name: {
      $nin: [
        "Pedagogium",
        "WSTIJO",
        "WSKM",
        "Dev Acc",
        "Krzysztof Lewandowski",
        "New Student",
        "Test Acc",
      ],
    },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allSSWUsers = async () =>
  await UniUsers.find({
    university: "SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allMANSUsers = async () =>
  await UniUsers.find({
    university: "MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allAHNSUsers = async () =>
  await UniUsers.find({
    university: "AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)",
    name: { $nin: ["Pedagogium", "Dev Acc", "Krzysztof Lewandowski"] },
  }).select("-visitedTime -token -university -createdAt -updatedAt");

const allANSWPUsers = async () =>
  await UniUsers.find({
    university: "ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)",
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
  allWSTIJOUsers,
  allWSKMUsers,
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
