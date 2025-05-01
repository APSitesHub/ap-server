const { allSSWUsers } = require("../../services/uniUsersServices");

const getAllSSWUsers = async (_, res) => {
  return res.json(await allSSWUsers());
};

module.exports = getAllSSWUsers;
