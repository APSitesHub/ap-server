const { getAllLinks } = require("../../services/linksServices");

const getLinks = async (_, res) => {
  return res.json(await getAllLinks());
};

module.exports = getLinks;
