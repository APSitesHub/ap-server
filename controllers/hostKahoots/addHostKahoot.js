const { newHostKahoot } = require("../../services/hostKahootsServices");

const addHostKahoot = async (req, res) =>
  res.status(201).json(await newHostKahoot(req.body));

module.exports = addHostKahoot;
