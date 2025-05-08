const { allANSWPUsers } = require("../../services/uniUsersServices");

const getAllANSWPUsers = async (_, res) => {
  return res.json(await allANSWPUsers());
};

module.exports = getAllANSWPUsers;
