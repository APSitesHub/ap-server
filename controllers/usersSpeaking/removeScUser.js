const { deleteScUser, findScUserByID } = require("../../services/scUsersServices");

const removeScUser = async (req, res) => {
  console.log(await findScUserByID(req.params.id));
  res.status(204).json(await deleteScUser(req.params.id));
};

module.exports = removeScUser;
