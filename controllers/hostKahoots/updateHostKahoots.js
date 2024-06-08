const HostKahoots = require("../../db/models/hostKahootsModel");
const { patchHostKahoots } = require("../../services/hostKahootsServices");

const updateHostKahoots = async (req, res) => {
  const kahoots = await HostKahoots.findOne({});
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
  res.status(201).json(await patchHostKahoots(kahoots.id, body));
};
module.exports = updateHostKahoots;
