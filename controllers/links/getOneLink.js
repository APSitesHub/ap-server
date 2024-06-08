const { getFirstLink } = require("../../services/linksServices");

const getOneLink = async (_, res) => {
  return res.json(await getFirstLink());
};

module.exports = getOneLink;
