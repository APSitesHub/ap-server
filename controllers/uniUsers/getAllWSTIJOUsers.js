const { allWSTIJOUsers } = require("../../services/uniUsersServices");

const getAllWSTIJOUsers = async (_, res) => {
  return res.json(await allWSTIJOUsers());
};

module.exports = getAllWSTIJOUsers;
