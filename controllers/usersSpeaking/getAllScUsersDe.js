const { allScDeUsers } = require("../../services/scUsersServices");

const getAllScUsersDe = async (_, res) => {
  return res.json(await allScDeUsers());
};

module.exports = getAllScUsersDe;
