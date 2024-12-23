const { getFirstUniLink } = require("../../services/uniLinksServices");

const getOneUniLink = async (_, res) => {
  return res.json(await getFirstUniLink());
};

module.exports = getOneUniLink;
