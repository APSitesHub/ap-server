const { getAllRatings } = require("../../services/ratingsServices");

const getRatings = async (_, res) => {
  return res.json(await getAllRatings());
};

module.exports = getRatings;
