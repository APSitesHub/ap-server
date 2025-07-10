const { allWSKMUsers } = require("../../services/uniUsersServices");

const getAllWSKMUsers = async (_, res) => {
  return res.json(await allWSKMUsers());
};

module.exports = getAllWSKMUsers;
