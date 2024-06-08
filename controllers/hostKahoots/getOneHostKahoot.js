const { getFirstHostKahoot } = require("../../services/hostKahootsServices");

const getOneHostKahoot = async (_, res) => {
  return res.json(await getFirstHostKahoot());
};

module.exports = getOneHostKahoot;
