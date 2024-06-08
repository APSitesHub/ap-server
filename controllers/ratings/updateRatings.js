const Ratings = require("../../db/models/ratingsModel");
const { patchRatings } = require("../../services/ratingsServices");

const updateRatings = async (req, res) => {
  const ratings = await Ratings.findOne({ period: req.body.period });
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchRatings(ratings.id, body));
};
module.exports = updateRatings;
