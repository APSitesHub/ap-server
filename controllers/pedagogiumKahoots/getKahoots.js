const { getAllKahoots } = require("../../services/pedagogiumKahootsServices");

const getKahoots = async (_, res) => {
  return res.json(await getAllKahoots());
};

module.exports = getKahoots;
