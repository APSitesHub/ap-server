const UniKahoots = require("../db/models/uniKahootsModel");

const getAllUniKahoots = async () => await UniKahoots.find({});

const getFirstUniKahoot = async () => await UniKahoots.findOne({});

const newUniKahoots = async (body) => await UniKahoots(body).save();

const patchUniKahoots = async (id, body) =>
  await UniKahoots.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllUniKahoots,
  getFirstUniKahoot,
  newUniKahoots,
  patchUniKahoots,
};
