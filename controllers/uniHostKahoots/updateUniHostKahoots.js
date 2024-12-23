const UniHostKahoots = require("../../db/models/uniHostKahootsModel");
const { patchUniHostKahoots } = require("../../services/uniHostKahootsServices");

const updateUniHostKahoots = async (req, res) => {
  const kahoots = await UniHostKahoots.findOne({});
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
  res.status(201).json(await patchUniHostKahoots(kahoots.id, body));
};
module.exports = updateUniHostKahoots;
