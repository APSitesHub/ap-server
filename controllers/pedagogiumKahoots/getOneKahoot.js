const {
  getKahootByGroup,
} = require("../../services/pedagogiumKahootsServices");

const getOneKahoot = async (req, res) => {
  return res.json(await getKahootByGroup(req.params.group));
};

module.exports = getOneKahoot;
