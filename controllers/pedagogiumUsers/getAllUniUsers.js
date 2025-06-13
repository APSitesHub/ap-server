const { allUniUsers } = require("../../services/pedagogiumUsersServices");

const getAllUniUsers = async (_, res) => {
  return res.json(await allUniUsers());
};

module.exports = getAllUniUsers;
