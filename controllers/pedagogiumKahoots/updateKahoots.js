const { patchKahoots } = require("../../services/pedagogiumKahootsServices");

const updateKahoots = async (req, res) => {
  return res
    .status(201)
    .json(
      await patchKahoots({ group: req.body.group }, { links: req.body.links })
    );
};
module.exports = updateKahoots;
