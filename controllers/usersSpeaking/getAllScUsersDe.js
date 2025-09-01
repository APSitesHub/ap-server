const { allScDeUsers } = require("../../services/scUsersServices");

const getAllScUsersDe = async (req, res) => {
  return res.json(await allScDeUsers(req.query));
};

module.exports = getAllScUsersDe;
