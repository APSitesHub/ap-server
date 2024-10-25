const { newTestScUser } = require("../../services/testScUsersServices");

const addTestScUser = async (req, res) => {
  res.status(201).json(await newTestScUser({ ...req.body }));
};

module.exports = addTestScUser;
