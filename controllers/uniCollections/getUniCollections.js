const { getAllUniCollections } = require("../../services/uniCollectionsServices");

const getUniCollections = async (_, res) => {
  return res.json(await getAllUniCollections());
};

module.exports = getUniCollections;
