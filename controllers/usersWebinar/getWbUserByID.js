const { findWbUserByID } = require("../../services/wbUsersServices");

const getWbUserByID = async (req, res) => {
  return res.json(await findWbUserByID(req.params.id));
};

module.exports = getWbUserByID;
