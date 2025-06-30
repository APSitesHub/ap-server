const { patchTours } = require("../../services/toursServices");

const updateTours = async (req, res) => {
  const { params, body } = req;
  res.status(201).json(await patchTours(params.id, body));
};
module.exports = updateTours;
