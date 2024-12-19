const { findUniUser } = require("../../services/uniUsersServices");

const getUniUser = async (req, res) => {
  return res.json(await findUniUser(req.body));
};

module.exports = getUniUser;
