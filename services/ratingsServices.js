const Ratings = require("../db/models/ratingsModel");

const getAllRatings = async () => await Ratings.find({});

const getLastRating = async () => await Ratings.findOne({});

const newRatings = async (body) => await Ratings(body).save();

const patchRatings = async (id, body) =>
  await Ratings.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllRatings,
  getLastRating,
  newRatings,
  patchRatings,
};
