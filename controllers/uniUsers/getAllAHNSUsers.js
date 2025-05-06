const { allAHNSUsers } = require("../../services/uniUsersServices");

const getAllAHNSUsers = async (_, res) => {
  return res.json(await allAHNSUsers());
};

module.exports = getAllAHNSUsers;
