const { findUniUserByID } = require("../../services/pedagogiumUsersServices");

const getUniUserByID = async (req, res) => {
  return res.json(await findUniUserByID(req.params.id));
};

module.exports = getUniUserByID;
