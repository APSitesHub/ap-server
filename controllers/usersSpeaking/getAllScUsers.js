const { allScUsers } = require("../../services/scUsersServices");

const getAllScUsers = async (_, res) => {
  return res.json(await allScUsers());
};

module.exports = getAllScUsers;
