const { newTours } = require("../../services/toursServices");

const addTours = async (req, res) =>
  res.status(201).json(await newTours(req.body));

module.exports = addTours;
