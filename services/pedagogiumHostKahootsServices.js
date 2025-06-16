const Kahoots = require("../db/models/pedagogiumHostKahootsModel");

const getAllKahoots = async () => await Kahoots.find({});

const getKahootByGroup = async (group) => await Kahoots.findOne({ group });

const newKahoots = async (body) => await Kahoots(body).save();

const patchKahoots = async (group, body) =>
  await Kahoots.findOneAndUpdate(group, body, { new: true, upsert: true });

module.exports = {
  getAllKahoots,
  getKahootByGroup,
  newKahoots,
  patchKahoots,
};
