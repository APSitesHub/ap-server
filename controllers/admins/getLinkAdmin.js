const { findAdmin } = require("../../services/adminsServices");

const getLinkAdmin = async (_, res) => {
  return res.json(await findAdmin());
};

module.exports = getLinkAdmin;
