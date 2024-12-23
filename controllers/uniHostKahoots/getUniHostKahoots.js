const { getAllUniHostKahoots } = require("../../services/uniHostKahootsServices");

const getUniHostKahoots = async (_, res) => {
  return res.json(await getAllUniHostKahoots());
};

module.exports = getUniHostKahoots;
