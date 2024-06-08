const { newCollections } = require("../../services/collectionsServices");

const addCollections = async (req, res) =>
  res.status(201).json(await newCollections(req.body));

module.exports = addCollections;
