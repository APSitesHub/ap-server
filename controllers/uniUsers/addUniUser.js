const { newUniUser } = require("../../services/uniUsersServices");

const addUniUser = async (req, res) => {
  console.log("addUser", req.body);
  res.status(201).json(await newUniUser({ ...req.body }));
};

module.exports = addUniUser;
