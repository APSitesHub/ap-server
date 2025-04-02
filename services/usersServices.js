const Users = require("../db/models/usersModel");

const allUsers = async () =>
  await Users.find({})
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);

const allC1Users = async () =>
  await Users.find({
    $or: [
      { course: { $regex: "10", $options: "i" } },
      { course: { $regex: "11", $options: "i" } },
    ],
  }).select(
    "-visitedTime -adult -zoomMail -token -createdAt -updatedAt -feedback -__v"
  );

const allUsersPlatform = async () => {
  return await Users.find({}).select("mail pupilId -_id");
};

const allUsersPlatformENG = async () => {
  return await Users.find({
    lang: { $regex: /en/, $ne: "enkids" },
  }).select("mail pupilId lang -_id");
};

const allUsersPlatformENGKIDS = async () => {
  return await Users.find({
    lang: { $regex: /enkids/ },
  }).select("mail pupilId -_id"); // Вибираємо тільки поля mail та pupilId, без _id
};

const allUsersPlatformPLKIDS = async () => {
  return await Users.find({
    lang: { $regex: /plkids/ },
  }).select("mail pupilId -_id"); // Вибираємо тільки поля mail та pupilId, без _id
};

const allUsersPlatformPL = async () => {
  return await Users.find({
    lang: { $regex: /pl/i, $ne: "plkids" }, // Пошук, щоб lang починався з "pl"
  }).select("mail pupilId lang -_id");
};

const allUsersPlatformDEKIDS = async () => {
  return await Users.find({
    lang: { $regex: /dekids/i },
  }).select("mail pupilId -_id"); // Вибираємо тільки поля mail та pupilId, без _id
};

const allUsersPlatformDE = async () => {
  return await Users.find({
    lang: { $regex: /de/i, $ne: "dekids" },
  }).select("mail pupilId -_id");
};

const findUser = async (query) => await Users.findOne(query);

const findUserByID = async (id) => await Users.findById(id);

const newUser = async (body) => await Users(body).save();

const deleteUser = async (id) => await Users.findByIdAndDelete(id);

const signInUser = async (id, body) =>
  await Users.findByIdAndUpdate(id, body, { new: true });

const updateUser = async (id, body) =>
  await Users.findByIdAndUpdate(id, body, { new: true });

const updateUserByCrmId = async (crmId, body) =>
  await Users.findOneAndUpdate(crmId, body, { new: true });

module.exports = {
  allUsers,
  findUser,
  findUserByID,
  newUser,
  deleteUser,
  signInUser,
  updateUser,
  updateUserByCrmId,
  allUsersPlatformENG,
  allUsersPlatformENGKIDS,
  allUsersPlatformPLKIDS,
  allUsersPlatformPL,
  allUsersPlatformDEKIDS,
  allUsersPlatformDE,
  allUsersPlatform,
  allC1Users,
};
