const { findUserByID } = require("../../services/usersServices");

const getUserByID = async (req, res) => {
  return res.json(await findUserByID(req.params.id));
};

module.exports = getUserByID;
