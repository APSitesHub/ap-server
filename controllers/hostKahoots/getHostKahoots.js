const { getAllHostKahoots } = require("../../services/hostKahootsServices");

const getHostKahoots = async (_, res) => {
  return res.json(await getAllHostKahoots());
};

module.exports = getHostKahoots;
