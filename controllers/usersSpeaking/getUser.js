const { findUser } = require("../../services/usersServices");

const getUser = async (req, res) => {
  return res.json(await findUser(req.body));
};

module.exports = getUser;
