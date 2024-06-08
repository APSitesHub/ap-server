const { Schema, model } = require("mongoose");

const ratings = new Schema(
  {
    period: {
      type: String,
    },
    rating: {
      type: Object,
      required: [true, "No rating"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ratings = model("ratings", ratings);

module.exports = Ratings;
