const { findWbUser } = require("../../services/wbUsersServices");

const getWbUser = async (req, res) => {
  return res.json(await findWbUser(req.query));
};

module.exports = getWbUser;
