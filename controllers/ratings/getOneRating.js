const { getLastRating } = require("../../services/ratingsServices");

const getOneRatings = async (_, res) => {
  return res.json(await getLastRating());
};

module.exports = getOneRatings;
