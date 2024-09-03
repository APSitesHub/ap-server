const { updateScUser } = require("../../services/scUsersServices");

const editScUser = async (req, res) => {
  res.status(200).json(await updateScUser({userId: req.params.id}, req.body));
};

module.exports = editScUser;
