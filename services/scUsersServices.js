const ScUsers = require("../db/models/scUsersModel");

const allScUsers = async () => await ScUsers.find({});

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
  findScUser,
  findScUserByID,
  newScUser,
  deleteScUser,
  signInScUser,
  updateScUser,
  updateScUserByCrmId,
};
