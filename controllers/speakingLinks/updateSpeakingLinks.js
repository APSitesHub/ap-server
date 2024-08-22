const LinksSpeaking = require("../../db/models/linksSpeakingModel");
const { patchLinksSpeaking } = require("../../services/linksSpeakingServices");

const updateSpeakingLinks = async (req, res) => {
  const links = await LinksSpeaking.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchLinksSpeaking(links.id, body));
};
module.exports = updateSpeakingLinks;
