const HostKahoots = require("../db/models/hostKahootsModel");

const getAllHostKahoots = async () => await HostKahoots.find({});

const getFirstHostKahoot = async () => await HostKahoots.findOne({});

const newHostKahoot = async (body) => await HostKahoots(body).save();

const patchHostKahoots = async (id, body) =>
  await HostKahoots.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllHostKahoots,
  getFirstHostKahoot,
  newHostKahoot,
  patchHostKahoots,
};
