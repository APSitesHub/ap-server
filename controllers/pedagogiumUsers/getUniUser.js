const { findUniUser } = require("../../services/pedagogiumUsersServices");

const getUniUser = async (req, res) => {
  return res.json(await findUniUser(req.body));
};

module.exports = getUniUser;
