const { getAllCollections } = require("../../services/collectionsServices");

const getCollections = async (_, res) => {
  return res.json(await getAllCollections());
};

module.exports = getCollections;
