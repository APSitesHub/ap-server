const { allMANSUsers } = require("../../services/uniUsersServices");

const getAllMANSUsers = async (_, res) => {
  return res.json(await allMANSUsers());
};

module.exports = getAllMANSUsers;
