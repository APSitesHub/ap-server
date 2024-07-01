const { updateUser } = require("../../services/usersServices");

const editUser = async (req, res) => {
  res.status(200).json(await updateUser(req.params.id, req.body));
};

module.exports = editUser;
