const { getAllUniLinks } = require("../../services/uniLinksServices");

const getUniLinks = async (_, res) => {
  return res.json(await getAllUniLinks());
};

module.exports = getUniLinks;
