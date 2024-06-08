const { getFirstKahoot } = require("../../services/kahootsServices");

const getOneKahoot = async (_, res) => {
  return res.json(await getFirstKahoot());
};

module.exports = getOneKahoot;
