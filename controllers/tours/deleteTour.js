const { removeTour } = require("../../services/toursServices");

const deleteTour = async (req, res) =>
  res.status(200).json(await removeTour(req.params.id));

module.exports = deleteTour;
