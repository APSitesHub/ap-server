const {
  findWbUserByID,
  deleteWbUser,
} = require("../../services/wbUsersServices");

const removeWbUser = async (req, res) => {
  console.log(await findWbUserByID(req.params.id));
  res.status(204).json(await deleteWbUser(req.params.id));
};

module.exports = removeWbUser;
