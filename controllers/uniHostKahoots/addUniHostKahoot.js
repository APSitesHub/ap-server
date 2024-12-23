const { newUniHostKahoot } = require("../../services/uniHostKahootsServices");

const addUniHostKahoot = async (req, res) =>
  res.status(201).json(await newUniHostKahoot(req.body));

module.exports = addUniHostKahoot;
