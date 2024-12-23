const { getAllUniKahoots } = require("../../services/uniKahootsServices");

const getUniKahoots = async (_, res) => {
  return res.json(await getAllUniKahoots());
};

module.exports = getUniKahoots;
