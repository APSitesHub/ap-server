const { newUniCollections } = require("../../services/uniCollectionsServices");

const addUniCollections = async (req, res) =>
  res.status(201).json(await newUniCollections(req.body));

module.exports = addUniCollections;
