const { findCollectionsAdmin } = require("../../services/adminsServices");

const getCollectionsAdmin = async (_, res) => {
  return res.json(await findCollectionsAdmin());
};

module.exports = getCollectionsAdmin;
