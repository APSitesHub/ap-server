const { findUserAdmin } = require("../../services/adminsServices");

const getUserAdmin = async (_, res) => {
  return res.json(await findUserAdmin());
};

module.exports = getUserAdmin;
