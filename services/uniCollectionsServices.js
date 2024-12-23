const UniCollections = require("../db/models/uniCollectionsModel");

const getAllUniCollections = async () => await UniCollections.find({});

const newUniCollections = async (body) => await UniCollections(body).save();

const patchUniCollections = async (id, body) =>
  await UniCollections.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllUniCollections,
  newUniCollections,
  patchUniCollections,
};
