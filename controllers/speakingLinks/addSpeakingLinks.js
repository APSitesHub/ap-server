const { newLinksSpeaking } = require("../../services/linksSpeakingServices");

const addSpeakingLinks = async (req, res) =>
  res.status(201).json(await newLinksSpeaking(req.body));

module.exports = addSpeakingLinks;
