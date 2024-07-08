const { newUser } = require("../../services/usersServices");

const addUserByCrmId = async (req, res) => {
  res.status(200).json(await newUser(req.body));
};

module.exports = addUserByCrmId;
