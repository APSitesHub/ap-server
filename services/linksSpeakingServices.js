const LinksSpeaking = require("../db/models/linksSpeakingModel");

const getAllLinksSpeaking = async () => await LinksSpeaking.find({});

const getFirstLinkSpeaking = async () => await LinksSpeaking.findOne({});

const newLinksSpeaking = async (body) => await LinksSpeaking(body).save();

const patchLinksSpeaking = async (id, body) =>
  await LinksSpeaking.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllLinksSpeaking,
  getFirstLinkSpeaking,
  newLinksSpeaking,
  patchLinksSpeaking,
};
