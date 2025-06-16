const {
  getKahootByGroup,
} = require("../../services/pedagogiumHostKahootsServices");

const getOneKahoot = async (req, res) => {
  return res.json(await getKahootByGroup(req.params.group));
};

module.exports = getOneKahoot;
