const { newRatings } = require("../../services/ratingsServices");

const addRatings = async (req, res) =>
  res.status(201).json(await newRatings(req.body));

module.exports = addRatings;
