const { findKahootAdmin } = require("../../services/adminsServices");

const getKahootAdmin = async (_, res) => {
  return res.json(await findKahootAdmin());
};

module.exports = getKahootAdmin;
