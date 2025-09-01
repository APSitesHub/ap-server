const { allScPlUsers } = require("../../services/scUsersServices");

const getAllScUsersPl = async (req, res) => {
  return res.json(await allScPlUsers(req.query));
};

module.exports = getAllScUsersPl;
