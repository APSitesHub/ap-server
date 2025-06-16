const { Schema, model } = require("mongoose");

const pedagogiumKahootsModel = new Schema(
  {
    group: { type: String },
    links: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PedagogiumKahootsModel = model(
  "pedagogiumkahoots",
  pedagogiumKahootsModel
);

module.exports = PedagogiumKahootsModel;
