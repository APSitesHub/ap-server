const Kahoots = require("../db/models/kahootsModel");

const getAllKahoots = async () => await Kahoots.find({});

const getFirstKahoot = async () => await Kahoots.findOne({});

const newKahoots = async (body) => await Kahoots(body).save();

const patchKahoots = async (id, body) =>
  await Kahoots.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllKahoots,
  getFirstKahoot,
  newKahoots,
  patchKahoots,
};
