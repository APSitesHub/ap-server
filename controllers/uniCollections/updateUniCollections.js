const UniCollections = require("../../db/models/uniCollectionsModel");
const { patchUniCollections } = require("../../services/uniCollectionsServices");

const updateUniCollections = async (req, res) => {
  const collections = await UniCollections.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchUniCollections(collections.id, body));
};
module.exports = updateUniCollections;
