const ScUsers = require("../db/models/scUsersModel");

const allScUsers = async () => await ScUsers.find({});

const allCourseUsers = async (query) =>
  await ScUsers.find(query)
    .where("feedback")
    .slice(-1)
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);

const ratingScUsers = async () =>
  await ScUsers.find({})
    .select("_id name visitedTime lang course")
    .where("visitedTime")
    .slice(-1);

const findScUser = async (query) => await ScUsers.findOne(query);

const findScUserByID = async (id) => await ScUsers.findById(id);

const newScUser = async (body) => await ScUsers(body).save();

const deleteScUser = async (id) => await ScUsers.findByIdAndDelete(id);

const signInScUser = async (id, body) =>
  await ScUsers.findByIdAndUpdate(id, body, { new: true });

const updateScUser = async (query, body) =>
  await ScUsers.findOneAndUpdate(query, body, { new: true });

const updateScUserByCrmId = async (crmId, body) =>
  await ScUsers.findOneAndUpdate(crmId, body, { new: true });

module.exports = {
  allScUsers,
  allCourseUsers,
  findScUser,
  findScUserByID,
  newScUser,
  deleteScUser,
  signInScUser,
  updateScUser,
  updateScUserByCrmId,
  ratingScUsers,
};
