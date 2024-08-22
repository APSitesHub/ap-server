const { getFirstLinkSpeaking } = require("../../services/linksSpeakingServices");

const getOneSpeakingLink = async (_, res) => {
  return res.json(await getFirstLinkSpeaking());
};

module.exports = getOneSpeakingLink;
