const { getFirstUniKahoot } = require("../../services/uniKahootsServices");

const getOneUniKahoot = async (_, res) => {
  return res.json(await getFirstUniKahoot());
};

module.exports = getOneUniKahoot;
