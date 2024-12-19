const { allUniUsers } = require("../../services/uniUsersServices");

const getAllUniUsers = async (_, res) => {
  return res.json(await allUniUsers());
};

module.exports = getAllUniUsers;
