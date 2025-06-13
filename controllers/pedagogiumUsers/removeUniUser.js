const {
  findUniUserByID,
  deleteUniUser,
} = require("../../services/pedagogiumUsersServices");

const removeUniUser = async (req, res) => {
  console.log(await findUniUserByID(req.params.id));
  res.status(204).json(await deleteUniUser(req.params.id));
};

module.exports = removeUniUser;
