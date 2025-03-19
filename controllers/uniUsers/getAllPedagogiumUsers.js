const { allPedagogiumUsers } = require("../../services/uniUsersServices");

const getAllPedagogiumUsers = async (_, res) => {
  return res.json(await allPedagogiumUsers());
};

module.exports = getAllPedagogiumUsers;
