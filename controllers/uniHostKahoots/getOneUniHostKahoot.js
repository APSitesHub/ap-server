const { getFirstUniHostKahoot } = require("../../services/uniHostKahootsServices");

const getOneUniHostKahoot = async (_, res) => {
  return res.json(await getFirstUniHostKahoot());
};

module.exports = getOneUniHostKahoot;
