const WbUsers = require("../db/models/wbUsersModel");

const allWbUsers = async () =>
  await WbUsers.find({}).select("_id name lang course");

const ratingWbUsers = async () =>
  await WbUsers.find({})
    .select("_id name visitedTime lang course")
    .where("visitedTime")
    .slice(-1);

const findWbUser = async (query) => await WbUsers.findOne(query);

const findWbUserByID = async (id) => await WbUsers.findById(id);

const newWbUser = async (body) => await WbUsers(body).save();

const deleteWbUser = async (id) => await WbUsers.findByIdAndDelete(id);

const updateWbUser = async (id, body) =>
  await WbUsers.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  allWbUsers,
  findWbUser,
  findWbUserByID,
  newWbUser,
  deleteWbUser,
  updateWbUser,
  ratingWbUsers,
};
