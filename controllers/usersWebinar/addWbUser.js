const { newWbUser } = require("../../services/wbUsersServices");

const addWbUser = async (req, res) => {
  res.status(201).json(await newWbUser({ ...req.body }));
};

module.exports = addWbUser;
