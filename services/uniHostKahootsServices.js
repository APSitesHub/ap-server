const UniHostKahoots = require("../db/models/uniHostKahootsModel");

const getAllUniHostKahoots = async () => await UniHostKahoots.find({});

const getFirstUniHostKahoot = async () => await UniHostKahoots.findOne({});

const newUniHostKahoot = async (body) => await UniHostKahoots(body).save();

const patchUniHostKahoots = async (id, body) =>
  await UniHostKahoots.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllUniHostKahoots,
  getFirstUniHostKahoot,
  newUniHostKahoot,
  patchUniHostKahoots,
};
