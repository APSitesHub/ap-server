const { allScEnUsers } = require("../../services/scUsersServices");

const getAllScUsersEn = async (_, res) => {
  return res.json(await allScEnUsers());
};

module.exports = getAllScUsersEn;
