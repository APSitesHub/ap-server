const UniUsers = require("../db/models/uniUsersModel");

const allUniUsers = async () =>
  await UniUsers.find({})
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);

const findUniUser = async (query) => await UniUsers.findOne(query);

const findUniUserByID = async (id) => await UniUsers.findById(id);

const newUniUser = async (body) => await UniUsers(body).save();

const deleteUniUser = async (id) => await UniUsers.findByIdAndDelete(id);

const signInUniUser = async (id, body) =>
  await UniUsers.findByIdAndUpdate(id, body, { new: true });

const updateUniUser = async (id, body) =>
  await UniUsers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allUniUsers,
  findUniUser,
  findUniUserByID,
  newUniUser,
  deleteUniUser,
  signInUniUser,
  updateUniUser,
};
