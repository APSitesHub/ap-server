const { allPedagogiumUsers } = require("../../services/pedagogiumUsersServices");

const getAllPedagogiumUsers = async (_, res) => {
  return res.json(await allPedagogiumUsers());
};

module.exports = getAllPedagogiumUsers;
