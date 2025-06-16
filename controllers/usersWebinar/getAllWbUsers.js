const { allWbUsers } = require("../../services/wbUsersServices");

const getAllWbUsers = async (_, res) => {
  return res.json(await allWbUsers());
};

module.exports = getAllWbUsers;
