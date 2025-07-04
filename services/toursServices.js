const Tours = require("../db/models/toursModel");

const getAllTours = async () => await Tours.find({});

const newTours = async (body) => await Tours(body).save();

const patchTours = async (id, body) =>
  await Tours.findByIdAndUpdate(id, body, { new: true });

const removeTour = async (id) => await Tours.findByIdAndDelete(id);

module.exports = {
  getAllTours,
  newTours,
  patchTours,
  removeTour,
};
