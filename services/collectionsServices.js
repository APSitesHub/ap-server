const Collections = require("../db/models/collectionsModel");

const getAllCollections = async () => await Collections.find({});

const newCollections = async (body) => await Collections(body).save();

const patchCollections = async (id, body) =>
  await Collections.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllCollections,
  newCollections,
  patchCollections,
};
