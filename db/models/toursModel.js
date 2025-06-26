const { Schema, model } = require("mongoose");

const tours = new Schema(
  {
    page: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tours = model("tours", tours);

module.exports = Tours;
