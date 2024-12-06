const { allScPlUsers } = require("../../services/scUsersServices");

const getAllScUsersPl = async (_, res) => {
  return res.json(await allScPlUsers());
};

module.exports = getAllScUsersPl;
