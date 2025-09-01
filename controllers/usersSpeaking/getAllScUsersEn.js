const { allScEnUsers } = require("../../services/scUsersServices");

const getAllScUsersEn = async (req, res) => {
  return res.json(await allScEnUsers(req.query));
};

module.exports = getAllScUsersEn;
