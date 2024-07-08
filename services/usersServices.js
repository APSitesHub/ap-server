const Users = require("../db/models/usersModel");

const allUsers = async () => await Users.find({});

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
};
