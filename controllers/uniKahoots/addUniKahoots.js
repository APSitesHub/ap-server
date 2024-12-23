const { newUniKahoots } = require("../../services/uniKahootsServices");

const addUniKahoots = async (req, res) =>
  res.status(201).json(await newUniKahoots(req.body));

module.exports = addUniKahoots;
