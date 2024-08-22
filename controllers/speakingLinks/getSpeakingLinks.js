const { getAllLinksSpeaking } = require("../../services/linksSpeakingServices");

const getSpeakingLinks = async (_, res) => {
  return res.json(await getAllLinksSpeaking());
};

module.exports = getSpeakingLinks;
