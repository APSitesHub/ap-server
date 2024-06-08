const bcrypt = require("bcrypt");
const { newAdmin } = require("../../services/adminsServices");

const addAdmin = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  res.status(201).json(await newAdmin({ ...req.body }));
};

module.exports = addAdmin;
