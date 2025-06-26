const { getAllTours } = require("../../services/toursServices");

const getTours = async (_, res) => {
  return res.json(await getAllTours());
};

module.exports = getTours;
