const { newKahoots } = require("../../services/kahootsServices");

const addKahoots = async (req, res) =>
  res.status(201).json(await newKahoots(req.body));

module.exports = addKahoots;
