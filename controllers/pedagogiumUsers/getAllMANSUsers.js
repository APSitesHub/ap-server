const { allMANSUsers } = require("../../services/pedagogiumUsersServices");

const getAllMANSUsers = async (_, res) => {
  return res.json(await allMANSUsers());
};

module.exports = getAllMANSUsers;
