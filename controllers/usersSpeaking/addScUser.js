const { newScUser } = require("../../services/scUsersServices");

const addScUser = async (req, res) => {
  res.status(201).json(await newScUser({ ...req.body }));
};

module.exports = addScUser;
