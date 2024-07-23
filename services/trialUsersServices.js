const TrialUsers = require("../db/models/trialUsersModel");

const allTrialUsers = async () => await TrialUsers.find({});

const findTrialUser = async (query) => await TrialUsers.findOne(query);

const findTrialUserByID = async (id) => await TrialUsers.findById(id);

const newTrialUser = async (body) => await TrialUsers(body).save();

const deleteTrialUser = async (id) => await TrialUsers.findByIdAndDelete(id);

const signInTrialUser = async (id, body) =>
  await TrialUsers.findByIdAndUpdate(id, body, { new: true });

const updateTrialUser = async (id, body) =>
  await TrialUsers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allTrialUsers,
  findTrialUser,
  findTrialUserByID,
  newTrialUser,
  deleteTrialUser,
  signInTrialUser,
  updateTrialUser,
};
