const UniKahoots = require("../../db/models/uniKahootsModel");
const { patchUniKahoots } = require("../../services/uniKahootsServices");

const updateUniKahoots = async (req, res) => {
  const kahoots = await UniKahoots.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (!value.replace) {
      body[key] = { ...kahoots[key] };
      body[key].links = { ...body[key].links, ...value.links };
    }
    if (value && value.replace) {
      body[key] = value;
    }
  }
  res.status(201).json(await patchUniKahoots(kahoots.id, body));
};
module.exports = updateUniKahoots;
