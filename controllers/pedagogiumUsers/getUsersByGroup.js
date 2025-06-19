const { findUserByGroup } = require("../../services/pedagogiumUsersServices");

const getUsersByGroup = async (req, res) => {
  return res.json(await findUserByGroup(req.params.course, req.params.group));
};

module.exports = getUsersByGroup;
