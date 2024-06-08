const { allUsers } = require("../../services/usersServices");

const getAllUsers = async (_, res) => {
  return res.json(await allUsers());
};

module.exports = getAllUsers;
