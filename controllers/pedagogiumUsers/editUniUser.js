const { updateUniUser } = require("../../services/pedagogiumUsersServices");

const editUniUser = async (req, res) => {
  res.status(200).json(await updateUniUser(req.params.id, req.body));
};

module.exports = editUniUser;
