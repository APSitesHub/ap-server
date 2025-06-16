const { getAllKahoots } = require("../../services/pedagogiumHostKahootsServices");

const getKahoots = async (_, res) => {
  return res.json(await getAllKahoots());
};

module.exports = getKahoots;
