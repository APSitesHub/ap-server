const { Schema, model } = require("mongoose");

const pedagogiumHostKahootsModel = new Schema(
  {
    group: { type: String },
    links: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PedagogiumHostKahootsModel = model(
  "pedagogiumhostkahoots",
  pedagogiumHostKahootsModel
);

module.exports = PedagogiumHostKahootsModel;
