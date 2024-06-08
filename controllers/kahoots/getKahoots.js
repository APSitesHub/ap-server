const { getAllKahoots } = require("../../services/kahootsServices");

const getKahoots = async (_, res) => {
  return res.json(await getAllKahoots());
};

module.exports = getKahoots;
