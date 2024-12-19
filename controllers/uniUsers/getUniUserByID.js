const { findUniUserByID } = require("../../services/uniUsersServices");

const getUniUserByID = async (req, res) => {
  return res.json(await findUniUserByID(req.params.id));
};

module.exports = getUniUserByID;
