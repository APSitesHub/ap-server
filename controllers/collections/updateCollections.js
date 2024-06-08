const Collections = require("../../db/models/collectionsModel");
const { patchCollections } = require("../../services/collectionsServices");

const updateCollections = async (req, res) => {
  const collections = await Collections.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchCollections(collections.id, body));
};
module.exports = updateCollections;
